import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import { globalIgnores } from "eslint/config"

export default tseslint.config([
	globalIgnores(["dist"]),
	{
		files: ["**/*.{ts,tsx}"],
		extends: [js.configs.recommended, tseslint.configs.recommended],
		languageOptions: {
			ecmaVersion: 2021,
			globals: globals.browser
		},
		rules: {
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-empty-object-type": "off",
			"@typescript-eslint/ban-ts-comment": "off"
		}
	}
])
