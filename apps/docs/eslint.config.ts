import eslintPluginAstro from "eslint-plugin-astro"
import js from "@eslint/js"
import { defineConfig } from "eslint/config"
import prettier from "eslint-config-prettier"
import eslintPluginImport from "eslint-plugin-import"
import astroParser from "astro-eslint-parser"
import ts from "typescript-eslint"
import globals from "globals"
import path from "node:path"
import { includeIgnoreFile } from "@eslint/compat"

const gitignorePath = path.resolve(import.meta.dirname, ".gitignore")

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	ts.configs.recommended,
	...eslintPluginAstro.configs.recommended,
	prettier,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node }
		},
		rules: {
			"@typescript-eslint/no-empty-object-type": "off",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{ argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
			],
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/ban-ts-comment": "off",
			"no-control-regex": "off",
			"prefer-const": "off"
		}
	},
	{
		files: ["src/**/*.astro"],
		languageOptions: {
			parser: astroParser,
			parserOptions: {
				parser: ts.parser,
				extraFileExtensions: [".astro"]
			}
		},
		plugins: {
			import: eslintPluginImport,
			astro: eslintPluginAstro
		},
		rules: {
			"astro/no-set-html-directive": "warn",
			"import/no-unresolved": [
				"error",
				{
					ignore: [
						"^astro",
						"^virtual:",
						"^@astrojs/",
						"^@fefade-ui/",
						"\\.css$",
						"\\.svg$"
					]
				}
			],
			"@typescript-eslint/no-unused-vars": "off"
		},
		settings: {
			"import/resolver": {
				typescript: {
					alwaysTryTypes: true,
					project: "./tsconfig.json"
				},
				node: {
					paths: ["node_modules/.pnpm/node_modules"]
				}
			}
		}
	},
	{
		files: ["src/**/*.{js,ts}"],
		plugins: {
			import: eslintPluginImport
		}
	}
)
