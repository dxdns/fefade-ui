import { type VariantType } from "./variantType.js"

export type CardType = {
	isTranslucent?: boolean
	glowOnHover?: boolean
	animatedBorder?:
		| boolean
		| {
				stopOnHover?: boolean
				width?: number | string
				primaryColor?: string
				secondaryColor?: string
		  }
	variant?: Exclude<VariantType, "text">
}
