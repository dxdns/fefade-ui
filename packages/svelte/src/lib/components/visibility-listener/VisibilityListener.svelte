<script lang="ts">
	import {
		checkVisibilityAction,
		type VisibilityListenerType
	} from "@fefade-ui/core"
	import type { HTMLAttributes } from "svelte/elements"

	interface Props
		extends HTMLAttributes<HTMLDivElement>, VisibilityListenerType {}

	let { class: className = "", callback, children, ...rest }: Props = $props()
</script>

<div
	{...rest}
	class={className}
	use:checkVisibilityAction={{
		callback
	}}
>
	{@render children?.()}
</div>
