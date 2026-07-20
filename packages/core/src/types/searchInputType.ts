import { ActionEntryType } from "./actionType.js"
import { ColorType } from "./colorType.js"
import { VariantType } from "./variantType.js"

export type SearchInputType = {
	variant?: VariantType
	color?: ColorType
	actions?: ActionEntryType<HTMLElement>[]
}
