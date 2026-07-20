import { ActionEntryType } from "./actionType.js"
import { SizeType } from "./sizeType.js"
import { VariantType } from "./variantType.js"

export type TextFieldType = {
	label?: string
	variant?: VariantType
	focused?: boolean
	actions?: ActionEntryType<HTMLElement>[]
	size?: SizeType
}
