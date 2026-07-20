import {
	Constants,
	sizeToNumberUtil,
	type MediaQueryType,
	type BreakpointType
} from "@fefade-ui/core"

function getBreakpointValue(size: string): string {
	const root = document.documentElement
	const sizeValue = getComputedStyle(root)
		.getPropertyValue(`${Constants.CSS_VAR_PREFIX}-${size}`)
		.trim()
	return sizeValue || Constants.breakpoints[size as BreakpointType] || size
}

function matchesQuery(
	operator: string,
	width: number,
	breakpointValue: string
): boolean {
	return operator === "min-width"
		? width >= sizeToNumberUtil(breakpointValue)
		: width <= sizeToNumberUtil(breakpointValue)
}

export default function mediaQueryState(...args: MediaQueryType) {
	const [operator, size, node] = args

	if (typeof window === "undefined" || typeof document === "undefined") {
		return {
			get value() {
				return false
			},
			destroy() {}
		}
	}

	const root = document.documentElement
	const el = node ?? root
	const breakpointValue = getBreakpointValue(size)

	let data = $state(false)
	let mounted = $state(false)

	const observer = new ResizeObserver((entries) => {
		for (const entry of entries) {
			data = matchesQuery(operator, entry.contentRect.width, breakpointValue)
		}
	})

	$effect(() => {
		observer.observe(el)
		mounted = true

		return () => observer.disconnect()
	})

	return {
		get value() {
			return mounted && data
		},
		destroy() {
			observer.disconnect()
		}
	}
}
