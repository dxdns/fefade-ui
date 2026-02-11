import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname
})

const eslintConfig = [
	...compat.config({
		extends: ["next", "prettier"],
		rules: {
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_" }
			],
			"import/no-anonymous-default-export": "off",
			"react/display-name": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"react/no-unescaped-entities": "off"
		}
	})
]

export default eslintConfig
