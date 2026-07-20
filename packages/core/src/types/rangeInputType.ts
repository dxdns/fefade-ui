import { StatusColorType } from "./colorType.js"
import { OverrideType } from "./overrideType.js"
import { SizeType } from "./sizeType.js"

export type RangeInputType<T = {}> = OverrideType<
	{
		color?: StatusColorType | "primary"
		value?: number
		icon?: string | SVGElement
		size?: SizeType
		showValue?: boolean
	},
	T
>
