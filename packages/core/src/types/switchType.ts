import { SizeType } from "./sizeType.js"

export type SwitchType = {
	size?: SizeType
	indicatorColor?:
		| boolean
		| {
				unchecked?: string
				checked?: string
		  }
}
