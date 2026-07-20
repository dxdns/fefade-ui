import { VariantType } from "./variantType.js"

export type BottomSheetType = {
	isOpen: boolean
	handleClose: () => void
	/** Hiding the component (e.g., 75) */
	hideIn?: number
}

export type BottomSheetDragButtonType = {
	variant?: VariantType
}
