<script lang="ts">
	import { fade, fly } from "svelte/transition"
	import { transitionUtil } from "@fefade-ui/core/utils"
	import type { HTMLAttributes } from "svelte/elements"
	import { mergeStyleUtil } from "@fefade-ui/core/utils"
	import type { TransitionType } from "@fefade-ui/core/types"

	interface TabContentProps {
		isActive?: boolean
		transition?: TransitionType
	}

	interface Props extends TabContentProps, HTMLAttributes<HTMLDivElement> {}

	let {
		class: className = "",
		isActive = true,
		transition,
		children,
		...rest
	}: Props = $props()

	const style = $derived(mergeStyleUtil("padding: 1rem;", rest.style))
</script>

{#if isActive}
	<div
		{...rest}
		class={className}
		{style}
		use:transitionUtil={transition ?? {
			in: [fly, { x: 100, duration: 200 }],
			out: [fade, { duration: 100 }]
		}}
	>
		{@render children?.()}
	</div>
{/if}
