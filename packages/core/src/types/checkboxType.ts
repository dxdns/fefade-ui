import { StatusColorType } from "./colorType.js"
import { SizeType } from "./sizeType.js"

export type CheckboxType = {
	label?: string
	size?: SizeType
	color?: StatusColorType | "secondary"
}
