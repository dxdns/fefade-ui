<script lang="ts">
	import { goto } from "$app/navigation"
	import { page } from "$app/state"
	import type { ProjectEntry } from "$lib/types"
	import { Button, Card, TextField } from "@fefade-ui/svelte"

	const searchParams = page.url.searchParams

	let data: ProjectEntry[] = $state([])

	function handleAdd(event: Event) {
		event.preventDefault()

		const form = new FormData(event.target as HTMLFormElement)

		const getString = (key: string): string => (form.get(key) as string) ?? ""

		data = [
			...data,
			{
				title: getString("title"),
				description: getString("description")
			}
		]
	}

	function handleSubmit(event: Event) {
		event.preventDefault()

		const form = new FormData(event.target as HTMLFormElement)

		const params = {
			projects: form.get("projects") as string,
			...Object.fromEntries(searchParams.entries())
		}

		goto(`/activities?${new URLSearchParams(params).toString()}`)
	}
</script>

<h2>Projects</h2>

<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
	<form onsubmit={handleAdd} style="flex-grow: 1;" novalidate>
		<TextField label="Title" name="title" />
		<TextField label="Description" name="description" />

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
				max-height: 160px;
				padding-right: {data.length > 1 ? '1rem' : '0'};
				"
			>
				{#each data as { title, description }, i (`${title}-${i}}`)}
					<Card variant="contained">
						<p>{title}</p>
						<small class="muted">{description}</small>
					</Card>
				{/each}
			</div>
		</div>
	{/if}
</div>

<form onsubmit={handleSubmit} novalidate>
	<input hidden name="projects" value={JSON.stringify(data)} />

	<Button type="submit">Next</Button>
</form>
