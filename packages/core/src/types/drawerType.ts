import { PositionNoCenterType } from "./positionType.js"

export type DrawerType = {
	isOpen: boolean
	variant?: "permanent" | "temporary"
	position?: PositionNoCenterType
}
