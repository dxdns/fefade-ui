import { SizeType } from "./sizeType.js"
import { VariantType } from "./variantType.js"

export type NumberInputType = {
	variant?: VariantType
	value?: number
	onChange?: (value: number) => void
	autoFocus?: boolean
	step?: number
	size?: SizeType
}
