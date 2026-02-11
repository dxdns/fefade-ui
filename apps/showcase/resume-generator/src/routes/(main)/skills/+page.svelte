<script lang="ts">
	import { goto } from "$app/navigation"
	import { page } from "$app/state"
	import type { SkillGroup } from "$lib/types"
	import { Button, Card, TextField } from "@fefade-ui/svelte"

	const searchParams = page.url.searchParams

	let data: SkillGroup[] = $state([])

	function handleAdd(event: Event) {
		event.preventDefault()

		const form = new FormData(event.target as HTMLFormElement)

		const getString = (key: string): string => (form.get(key) as string) ?? ""

		data = [
			...data,
			{
				label: getString("label"),
				items: getString("items")
			}
		]
	}

	function handleSubmit(event: Event) {
		event.preventDefault()

		const form = new FormData(event.target as HTMLFormElement)

		const params = {
			skills: form.get("skills") as string,
			...Object.fromEntries(searchParams.entries())
		}

		goto(`/experience?${new URLSearchParams(params).toString()}`)
	}
</script>

<h2>Skills</h2>

<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
	<form onsubmit={handleAdd} style="flex-grow: 1;" novalidate>
		<TextField label="Label" name="label" />
		<TextField label="Items" name="items" />

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
				{#each data as { label, items }, i (`${label}-${i}}`)}
					<Card variant="contained">
						<p>{label}</p>
						<small class="muted">{items}</small>
					</Card>
				{/each}
			</div>
		</div>
	{/if}
</div>

<form onsubmit={handleSubmit} novalidate>
	<input hidden name="skills" value={JSON.stringify(data)} />

	<Button type="submit">Next</Button>
</form>
