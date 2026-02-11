<script lang="ts">
	import { BottomSheet, Button, Navbar, useMediaQuery } from "@fefade-ui/svelte"
	import { Info } from "$lib/components/info"
	import { ControlPlay } from "$lib/components/control-play"
	import { ControlAudio } from "$lib/components/control-audio"
	import { Constants } from "@fefade-ui/core"

	interface Props {
		name?: string
		image?: string
		isPlaying: boolean
		volume: number
		handleClick?: () => void
	}

	let {
		name,
		image,
		isPlaying,
		volume = $bindable(0),
		handleClick
	}: Props = $props()

	let isOpen = $state(false)

	const isLg = useMediaQuery("min-width", "lg")

	function handleClose() {
		isOpen = false
	}

	function handleOpen() {
		isOpen = !isOpen
	}
</script>

<BottomSheet.Overlay {isOpen} onclick={handleClose} style="z-index: 999;" />
<BottomSheet
	{isOpen}
	{handleClose}
	style="max-height: {isLg.value ? '35vh' : '45vh'};"
>
	<BottomSheet.DragButton />
	<BottomSheet.Content
		style="
		display: flex; 
		flex-direction: column; 
		align-items: center; 
		gap: 1rem;
		"
	>
		<Info {name} avatarProps={{ width: "6rem", height: "6rem", src: image }} />
		<small class="muted" style="font-weight: bold;">
			{name ?? "No station selected"}
		</small>
		<ControlPlay size="sm" {isPlaying} {handleClick} />
		<ControlAudio bind:volume />
	</BottomSheet.Content>
</BottomSheet>

{#if !isOpen}
	<Navbar
		style="
		position: fixed; 
		bottom: 0; 
		z-index: 999; 
		height: 60px; 
		left: 0;
		right: 0;
		background: {Constants.themeColorVar.bg};
		box-shadow: 0 0 10px rgba(0,0,0,0.5);
		"
	>
		<div style="flex: 1;"></div>
		<div
			style="
			display: flex; 
			align-items: center; 
			justify-content: center;
			gap: 1rem;
			"
		>
			<Button
				variant="text"
				style="gap: 0.5rem; min-width: 200px; max-width: 200px; padding: 0;"
				onclick={handleOpen}
			>
				<Info avatarProps={{ width: "34px", height: "34px", src: image }} />
				<small
					class="muted"
					style="
						white-space: nowrap; 
						overflow: hidden;
						text-overflow: ellipsis;
						text-align: center;
						"
				>
					{name ?? "No station selected"}
				</small>
			</Button>
			<ControlPlay size="xs" {isPlaying} {handleClick} />
		</div>
		<div style="flex: 1;"></div>
		{#if isLg.value}
			<ControlAudio bind:volume />
		{/if}
	</Navbar>
{/if}
