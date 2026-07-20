import { themeConfigState } from "../states/index.js"
import { providerUtil, type ThemeConfigUtilType } from "@fefade-ui/core"

export default function themeConfigUtil(): ThemeConfigUtilType {
	const themeConfig = themeConfigState()
	const { toggleThemeMode } = providerUtil()
	return {
		colors: themeConfig.getColors(),
		mode: themeConfig.getMode(),
		toggle: () => {
			toggleThemeMode((t) => {
				themeConfig.setThemeMode(t)
			})
		}
	}
}
