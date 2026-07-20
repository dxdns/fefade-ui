import type { SizeType } from "./sizeType.js"

export type BreakpointType = Exclude<SizeType, "xs"> | "2xl"

export type BreakpointThemeConfigType = Record<BreakpointType, string>
