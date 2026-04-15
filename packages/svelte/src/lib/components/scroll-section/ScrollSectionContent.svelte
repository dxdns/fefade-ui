<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements"
	import { scrollSectionAction } from "@fefade-ui/core/actions"
	import { scrollSectionState } from "$lib/states/index.js"

	interface Props extends HTMLAttributes<HTMLElement> {}

	let { class: className = "", children, ...rest }: Props = $props()
</script>

<section
	{...rest}
	class={className}
	use:scrollSectionAction={{
		scrollSection: scrollSectionState()
	}}
>
	{@render children?.()}
</section>
