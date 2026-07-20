import { VariantType } from "./variantType.js"

export type ModalType = {
	isOpen: boolean
	handleClose: () => void
	variant?: Exclude<VariantType, "text">
}
