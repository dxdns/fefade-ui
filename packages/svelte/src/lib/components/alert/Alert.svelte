<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements"
	import { classMapUtil, Constants, type AlertType } from "@fefade-ui/core"
	import {
		checkCircleIcon,
		errorIcon,
		infoIcon,
		warningIcon
	} from "@fefade-ui/core"
	import styles from "@fefade-ui/core/styles/Alert.module.css"

	interface Props
		extends Omit<HTMLAttributes<HTMLDivElement>, "color">, AlertType {}

	let {
		class: className = "",
		color = $bindable("info"),
		children,
		...rest
	}: Props = $props()

	const statusForegroundColor = Constants.ForegroundColor(color)

	const Icon = {
		error: errorIcon,
		info: infoIcon,
		warning: warningIcon,
		success: checkCircleIcon
	}[color]
</script>

<div
	{...rest}
	class={classMapUtil(
		className,
		[className, styles],
		[color, styles],
		styles.alert
	)}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 -960 960 960"
		style="
		display: inline-block; 
		vertical-align: middle;
		fill: {statusForegroundColor};
		width: 20px;
		height: 20px;
		max-width: max-content;
		"
	>
		<path d={Icon} />
	</svg>
	{@render children?.()}
</div>
