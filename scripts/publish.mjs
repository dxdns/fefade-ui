#!/usr/bin/env node
import { checkbox, confirm } from "@inquirer/prompts"
import { ExitPromptError } from "@inquirer/core"
import { execSync } from "child_process"
import { readdirSync, readFileSync, existsSync } from "fs"
import { join } from "path"
import chalk from "chalk"

function getPublishedVersion(name) {
	try {
		return execSync(`npm info ${name} version 2>/dev/null`, {
			encoding: "utf-8"
		}).trim()
	} catch {
		return null
	}
}

function getPackages() {
	const packagesDir = join(process.cwd(), "packages")

	if (!existsSync(packagesDir)) {
		console.error(chalk.red("'packages/' directory not found."))
		process.exit(1)
	}

	return readdirSync(packagesDir).flatMap((dir) => {
		const pkgPath = join(packagesDir, dir, "package.json")
		if (!existsSync(pkgPath)) return []

		const {
			name,
			version,
			private: isPrivate
		} = JSON.parse(readFileSync(pkgPath, "utf-8"))
		if (isPrivate) return []

		const publishedVersion = getPublishedVersion(name)
		return [
			{
				name,
				version,
				publishedVersion,
				isNew: publishedVersion !== version,
				dir
			}
		]
	})
}

function formatChoice(pkg) {
	return pkg.isNew
		? `${chalk.green("●")} ${pkg.name} ${chalk.gray(pkg.publishedVersion ?? "new")} → ${chalk.cyan(pkg.version)}`
		: `${chalk.gray("○")} ${pkg.name} ${chalk.gray(`${pkg.version} (already published)`)}`
}

async function main() {
	process.on("SIGINT", () => {
		console.log(chalk.yellow("\n\nCancelled."))
		process.exit(0)
	})

	console.log(chalk.bold("\n📦 Interactive package publisher\n"))

	const packages = getPackages()

	if (!packages.length) {
		console.log(chalk.yellow("No public packages found."))
		process.exit(0)
	}

	const selected = await checkbox({
		message: "Select packages to publish:",
		choices: packages.map((pkg) => ({
			name: formatChoice(pkg),
			value: pkg,
			checked: pkg.isNew
		})),
		pageSize: 15
	})

	if (!selected.length) {
		console.log(chalk.yellow("\nNo packages selected. Exiting."))
		process.exit(0)
	}

	console.log(chalk.bold("\nSelected packages:"))
	selected.forEach(({ name, version }) =>
		console.log(`  ${chalk.cyan(name)} → ${chalk.green(version)}`)
	)

	const ok = await confirm({ message: "\nConfirm publish?", default: false })

	if (!ok) {
		console.log(chalk.yellow("Cancelled."))
		process.exit(0)
	}

	console.log("")

	for (const { name, version, dir } of selected) {
		console.log(chalk.bold(`Publishing ${name}@${version}...`))
		try {
			execSync("pnpm publish --access public --no-git-checks", {
				cwd: join(process.cwd(), "packages", dir),
				stdio: "inherit"
			})
			console.log(chalk.green(`✔ ${name} published successfully!\n`))
		} catch {
			console.error(chalk.red(`✘ Failed to publish ${name}\n`))
		}
	}

	console.log(chalk.bold.green("Done!"))
}

main().catch((error) => {
	if (error instanceof ExitPromptError) {
		console.log(chalk.yellow("\nCancelled."))
		process.exit(0)
	}
	throw error
})
