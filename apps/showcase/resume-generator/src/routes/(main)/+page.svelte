<script lang="ts">
	import { goto } from "$app/navigation"
	import { Badge, Button, Card } from "@fefade-ui/svelte"

	const defaultModel = "FAANG"

	let modelSelected = $state(defaultModel)

	const resumeModelsData = [defaultModel]

	function handleClick() {
		if (modelSelected === "") {
			return
		}

		goto(`/personal?model=${modelSelected}`)
	}
</script>

<h2>Select resume model</h2>

<div
	style="
    display: grid; 
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); 
    gap: 1rem;
    "
>
	{#each resumeModelsData as model (model)}
		{@const selected = modelSelected === model}
		<Card
			title={model}
			onclick={() => {
				modelSelected = model
			}}
			style="
            cursor: pointer; 
            border-width: {selected ? '4px' : '1px'};
            "
		>
			{#if selected}
				<Badge
					class="muted bg-secondary"
					style="
                    position: absolute; 
                    top: -2px; 
                    right: -2px;
                    border-top-left-radius: 0;
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                    "
				>
					Selected
				</Badge>
			{/if}
			<p>{model}</p>
		</Card>
	{/each}
</div>

<Button onclick={handleClick}>Next</Button>
