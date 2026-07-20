export interface TransitionConfigType {
	delay?: number
	duration?: number
	easing?: (t: number) => number
	css?: (t: number, u: number) => string
	tick?: (t: number, u: number) => void
}

type TransitionFn = (node: Element, params?: any) => TransitionConfigType

export interface TransitionType {
	in?: [TransitionFn, any?]
	out?: [TransitionFn, any?]
}
