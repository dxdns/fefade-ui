<script lang="ts">
	import {
		Constants,
		classMapUtil,
		mergeStyleUtil,
		normalizeSizeUtil,
		type StatusType
	} from "@fefade-ui/core"
	import type { HTMLAttributes } from "svelte/elements"
	import styles from "@fefade-ui/core/styles/Status.module.css"

	interface Props
		extends Omit<HTMLAttributes<HTMLDivElement>, "color">, StatusType {}

	let {
		class: className = "",
		variant = "none",
		color = Constants.themeColorVar.bg,
		size = 30,
		...rest
	}: Props = $props()
</script>

<div
	{...rest}
	class={classMapUtil(
		className,
		[className, styles],
		[variant, styles],
		styles.status
	)}
	style={mergeStyleUtil(
		`--color: ${color};`,
		"--bg: whitesmoke;",
		`--size: ${normalizeSizeUtil(size)};`,
		"--bounce-distance: 15%;",
		rest.style
	)}
></div>
