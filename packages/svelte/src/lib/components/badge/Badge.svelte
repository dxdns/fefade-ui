<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements"
	import { classMapUtil, type BadgeType } from "@fefade-ui/core"
	import styles from "@fefade-ui/core/styles/Badge.module.css"

	interface Props extends HTMLAttributes<HTMLSpanElement>, BadgeType {}

	let {
		class: className = "",
		size = "xs",
		variant = "contained",
		roundedFull = false,
		children,
		...rest
	}: Props = $props()
</script>

<span
	{...rest}
	class={classMapUtil(
		className,
		[className, styles],
		styles.badge,
		[size, styles],
		[variant, styles],
		{
			[styles.roundedFull]: roundedFull
		}
	)}
>
	{@render children?.()}
</span>
