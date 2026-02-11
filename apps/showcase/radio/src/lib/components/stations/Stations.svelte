<script lang="ts">
	import type { StationsType } from "$lib/types"
	import { Constants } from "@fefade-ui/core"
	import { Avatar, Badge, Card, useMediaQuery } from "@fefade-ui/svelte"

	interface Props {
		currentId: string
		data: StationsType[]
		isPlaying: boolean
		handleClick: () => void
	}

	let {
		currentId = $bindable(""),
		data,
		isPlaying,
		handleClick
	}: Props = $props()

	const isMd = useMediaQuery("max-width", "md")
</script>

<div class="stations">
	{#each data as { name, favicon, stationuuid, tags }, i (`${name}-${stationuuid}`)}
		{@const newName = name.replace(/^\./, "")}
		{@const isActive = currentId === stationuuid && isPlaying}

		<Card
			animatedBorder={isActive && {
				width: "4px",
				primaryColor: "#00FFFF"
			}}
			variant="contained"
			style="
			display: flex;
    		flex-direction: column;
			margin: 0;
			cursor: pointer;
			gap: 1rem;
			{!isMd.value && i % 4 === 0
				? `background: ${Constants.themeColorVar.surface}; grid-column: span 3;`
				: 'grid-column: span 1'}
			"
			onclick={() => {
				currentId = stationuuid
				handleClick()
			}}
		>
			<div
				style="
				display: flex; 
				align-items: center; 
				gap: 0.5rem; 
				width: 100%; 
				justify-content: center;
				"
			>
				<Avatar textFallback={newName} src={favicon} />
				<p
					style="
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					margin: 0;
					flex: 1;
					"
				>
					{newName}
				</p>
			</div>
			{#if tags !== ""}
				<div
					style="
					display: flex; 
					gap: 0.5rem; 
					align-items: center;
					flex-wrap: wrap;
					justify-content: flex-end;
					"
				>
					{#each tags.split(",").slice(0, 2) as tag, i (`${tag}-${i}`)}
						<Badge variant="outlined">{tag}</Badge>
					{/each}
				</div>
			{/if}
		</Card>
	{/each}
</div>

<style>
	.stations {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1rem;
	}
</style>
