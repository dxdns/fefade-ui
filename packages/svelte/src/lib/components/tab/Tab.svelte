<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements"
	import type { OrientationType } from "@fefade-ui/core/types"
	import { mergeStyleUtil } from "@fefade-ui/core/utils"

	interface Props extends HTMLAttributes<HTMLDivElement> {
		orientation?: OrientationType
	}

	let {
		class: className = "",
		orientation = $bindable("horizontal"),
		children,
		...rest
	}: Props = $props()

	const style = $derived(
		mergeStyleUtil(
			orientation === "vertical" ? "display: flex;" : "",
			rest.style
		)
	)
</script>

<div {...rest} class={className} {style}>
	{@render children?.()}
</div>
