import { type SizeType } from "./sizeType.js"
import { type VariantType } from "./variantType.js"

export type ButtonType = {
	pressedEffect?: boolean
	variant?: VariantType
	isLoading?: boolean
	roundedFull?: boolean
	size?: SizeType
}
