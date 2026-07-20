<script lang="ts">
	import type { HTMLSelectAttributes } from "svelte/elements"
	import {
		classMapUtil,
		keyboardArrowDownIcon,
		styleToStringUtil,
		type CSSKebabType,
		type VariantType
	} from "@fefade-ui/core"
	import styles from "@fefade-ui/core/styles/Select.module.css"

	interface Props extends HTMLSelectAttributes {
		variant?: VariantType
		selectStyle?: CSSKebabType
	}

	let {
		class: className = "",
		variant = "contained",
		selectStyle,
		children,
		...rest
	}: Props = $props()
</script>

<div
	class={classMapUtil(
		className,
		[className, styles],
		[variant, styles],
		styles.select
	)}
	style={rest.style}
>
	<select {...rest} style={styleToStringUtil(selectStyle)}>
		{@render children?.()}
	</select>
	<svg
		class={styles.icon}
		viewBox="0 -960 960 960"
		style="
		display: inline-block; 
		vertical-align: middle;
		fill: currentColor;
		width: 24px;
		height: 24px;
		"
	>
		<path d={keyboardArrowDownIcon}></path>
	</svg>
</div>
