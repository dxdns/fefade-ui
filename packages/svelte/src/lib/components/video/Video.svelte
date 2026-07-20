<script lang="ts">
	import { videoAction, videoUtil, type VideoType } from "@fefade-ui/core"
	import type { HTMLVideoAttributes } from "svelte/elements"

	interface Props
		extends
			Omit<Omit<Omit<HTMLVideoAttributes, "src">, "color">, "type">,
			VideoType {}

	let { class: className = "", lazy, dataSrc, ...rest }: Props = $props()

	const { getVideoType } = videoUtil()

	let el: HTMLVideoElement | undefined = $state()
</script>

<video
	{...rest}
	use:videoAction={{ lazy }}
	bind:this={el}
	class={className}
	preload={lazy ? "none" : undefined}
	onmouseenter={() => {
		if (!el) return
		el.pause()
	}}
	onmouseleave={() => {
		if (!el) return
		el.play()
	}}
	data-src={dataSrc}
>
	<source type="video/{getVideoType(dataSrc).replace('.', '')}" />
</video>
