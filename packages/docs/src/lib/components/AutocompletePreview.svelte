<script lang="ts">
	import { Constants } from "@fefade-ui/core"
	import { Autocomplete, Link } from "@fefade-ui/svelte"

	const data = Array.from(Array(30)).map((_, i) => ({
		id: i,
		label: `test ${i}`
	}))
</script>

{#each Constants.variants as variant (variant)}
	<Autocomplete
		{variant}
		{data}
		filter={(item) => `${item.label}`}
		placeholder="test"
	>
		{#snippet renderInput({ id, label })}
			<Link href="/{id}">
				{label}
			</Link>
		{/snippet}
	</Autocomplete>
{/each}
