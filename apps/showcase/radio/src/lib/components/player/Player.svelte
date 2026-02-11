<script lang="ts">
	import { Card, Separator, useMediaQuery } from "@fefade-ui/svelte"
	import { type Snippet } from "svelte"
	import { ControlPlay } from "../control-play"
	import { ControlAudio } from "../control-audio"

	interface Props {
		isPlaying: boolean
		volume: number
		handleClick?: () => void
		radioInfo?: Snippet<[]>
		children: Snippet<[]>
	}

	let {
		isPlaying,
		volume = $bindable(0),
		handleClick,
		radioInfo,
		children
	}: Props = $props()

	const isMd = useMediaQuery("max-width", "md")
</script>

<Card
	variant="contained"
	style={!isMd.value
		? `display: flex; flex-direction: column; gap: 1rem; align-items: stretch;`
		: "all: unset;"}
>
	{#if !isMd.value}
		{@render radioInfo?.()}

		<div
			style="
			display: flex; 
			gap: 1rem; 
			justify-content: center; 
			flex-wrap: wrap;
			"
		>
			<ControlPlay {isPlaying} {handleClick} />
			<ControlAudio bind:volume />
		</div>
		<Separator />
	{/if}
	{@render children?.()}
</Card>
