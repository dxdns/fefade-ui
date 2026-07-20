<script lang="ts">
	import { classMapUtil, type BottomSheetDragButtonType } from "@fefade-ui/core"
	import type { HTMLAttributes } from "svelte/elements"
	import styles from "@fefade-ui/core/styles/BottomSheetDragButton.module.css"

	interface Props
		extends
			Omit<HTMLAttributes<HTMLDivElement>, "color">,
			BottomSheetDragButtonType {}

	let {
		class: className = "",
		variant = "text",
		children,
		...rest
	}: Props = $props()
</script>

<div
	{...rest}
	class={classMapUtil(
		className,
		[className, styles],
		[variant, styles],
		styles.bottomSheetDragButton
	)}
>
	{#if children}
		{@render children?.()}
	{:else}
		<span></span>
	{/if}
</div>
