<script lang="ts">
	import { imageAction, type ImageType } from "@fefade-ui/core"
	import type { HTMLImgAttributes } from "svelte/elements"

	interface Props
		extends Omit<Omit<HTMLImgAttributes, "src">, "color">, ImageType {}

	let {
		class: className = "",
		lazy = false,
		dataSrc,
		fallback,
		...rest
	}: Props = $props()
</script>

<img
	{...rest}
	use:imageAction={{ lazy }}
	class={className}
	data-src={dataSrc}
	data-fallback={fallback}
	loading={lazy ? "lazy" : undefined}
	decoding={lazy ? "async" : undefined}
/>
