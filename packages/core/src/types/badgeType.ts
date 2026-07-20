import { type SizeType } from "./sizeType.js"
import { type VariantType } from "./variantType.js"

export type BadgeType = {
	size?: SizeType
	variant?: Exclude<VariantType, "text">
	roundedFull?: boolean
}
