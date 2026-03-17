import { defineConfig } from "eslint/config"
import globals from "globals"
import js from "@eslint/js"
import prettier from "eslint-config-prettier"
import path from "path"
import { includeIgnoreFile } from "@eslint/compat"
import ts from "typescript-eslint"

const gitignorePath = path.resolve(import.meta.dirname, ".gitignore")

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	ts.configs.recommended,
	prettier,
	{
		files: ["src/**/*.{js,ts}"],
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		plugins: { js },
		extends: ["js/recommended"],
		rules: {
			"no-unused-vars": "warn",
			"no-undef": "off",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{ argsIgnorePattern: "^_" }
			]
		}
	}
)
