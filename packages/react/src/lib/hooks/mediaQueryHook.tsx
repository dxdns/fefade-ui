import type { MediaQueryType, BreakpointType } from "@fefade-ui/core/types"
import { useEffect, useState } from "react"
import { sizeToNumberUtil } from "@fefade-ui/core/utils"
import { Constants } from "@fefade-ui/core"

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

export function mediaQueryHook(...args: MediaQueryType) {
	const [operator, size, node] = args

	const [data, setData] = useState(false)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		const root = document.documentElement
		const el = node ?? root
		const breakpointValue = getBreakpointValue(size)

		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				setData(
					matchesQuery(operator, entry.contentRect.width, breakpointValue)
				)
			}
		})

		observer.observe(el)
		setMounted(true)

		return () => observer.disconnect()
	}, [operator, size, node])

	return mounted && data
}
