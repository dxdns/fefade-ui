<script lang="ts">
	import { goto } from "$app/navigation"
	import { page } from "$app/state"
	import { Button, Card, TextField } from "@fefade-ui/svelte"

	const searchParams = page.url.searchParams

	let data: string[] = $state([])

	function handleAdd(event: Event) {
		event.preventDefault()

		const form = new FormData(event.target as HTMLFormElement)

		const getString = (key: string): string => (form.get(key) as string) ?? ""

		data = [...data, getString("leadership")]
	}

	function handleSubmit(event: Event) {
		event.preventDefault()

		const form = new FormData(event.target as HTMLFormElement)

		const params = {
			leadership: form.get("leadership") as string,
			...Object.fromEntries(searchParams.entries())
		}

		goto(`/finish?${new URLSearchParams(params).toString()}`)
	}
</script>

<h2>Leadership</h2>

<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
	<form onsubmit={handleAdd} style="flex-grow: 1;" novalidate>
		<TextField label="Leadership" name="leadership" />

		<Button type="submit" variant="outlined">Add</Button>
	</form>

	{#if data.length > 0}
		<div style="flex-grow: 1; overflow-y: auto;">
			<div
				style="
				overflow-y: auto;
				display:grid; 
				grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
				gap: 1rem;
				max-height: 96px;
				padding-right: {data.length > 1 ? '1rem' : '0'};
				"
			>
				{#each data as activity, i (`${activity}-${i}}`)}
					<Card variant="contained">
						<small class="muted">{activity}</small>
					</Card>
				{/each}
			</div>
		</div>
	{/if}
</div>

<form onsubmit={handleSubmit} novalidate>
	<input hidden name="leadership" value={JSON.stringify(data)} />

	<Button type="submit">Next</Button>
</form>
