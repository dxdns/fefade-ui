import { Constants } from "@fefade-ui/core"
import type { ThemeColorType, ThemeModeType } from "@fefade-ui/core/types"
import { type InjectionKey, type Ref } from "vue"

export const ThemeConfigSymbol: InjectionKey<{
	mode: Ref<ThemeModeType>
	colors: Ref<ThemeColorType>
	toggle: () => void
}> = Symbol(Constants.THEME_CONTEXT)
