import js from "@eslint/js"
import sveltePlugin from "eslint-plugin-svelte"
import globals from "globals"
import ts from "typescript-eslint"
import svelteConfig from "./svelte.config.js"
import prettier from "eslint-config-prettier"

export default ts.config(
	js.configs.recommended,
	...ts.configs.recommended,

	{
		ignores: [
			"**/dist/**",
			"**/build/**",
			"**/node_modules/**",
			"**/public/**",
			"**/.svelte-kit/**",
			"**/.*",
			"**/paraglide/**"
		]
	},

	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},

	...sveltePlugin.configs["flat/recommended"],
	{
		files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
		languageOptions: {
			parserOptions: {
				parser: ts.parser,
				extraFileExtensions: [".svelte"],
				svelteConfig
			}
		},
		rules: {
			"svelte/no-at-html-tags": "off"
		}
	},

	{
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			parserOptions: {
				projectService: true
			}
		}
	},

	{
		rules: {
			"@typescript-eslint/no-empty-object-type": "off",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{ argsIgnorePattern: "^_" }
			],
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/ban-ts-comment": "off",
			"prefer-const": "off",
			"no-control-regex": "off"
		}
	},
	{
		...prettier
	}
)
