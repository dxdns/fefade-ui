<script lang="ts">
	import { goto } from "$app/navigation"
	import { page } from "$app/state"
	import type { ExperienceEntry } from "$lib/types"
	import { Button, Card, TextField } from "@fefade-ui/svelte"

	const searchParams = page.url.searchParams

	let data: ExperienceEntry[] = $state([])

	function handleAdd(event: Event) {
		event.preventDefault()

		const form = new FormData(event.target as HTMLFormElement)

		const getString = (key: string): string => (form.get(key) as string) ?? ""

		data = [
			...data,
			{
				company: getString("company"),
				role: getString("role"),
				location: getString("location"),
				period: getString("period"),
				bullets: getString("bullets").split(",")
			}
		]
	}

	function handleSubmit(event: Event) {
		event.preventDefault()

		const form = new FormData(event.target as HTMLFormElement)

		const params = {
			experience: form.get("experience") as string,
			...Object.fromEntries(searchParams.entries())
		}

		goto(`/projects?${new URLSearchParams(params).toString()}`)
	}
</script>

<h2>Experience</h2>

<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
	<form onsubmit={handleAdd} style="flex-grow: 1;" novalidate>
		<TextField label="Company" name="company" />
		<TextField label="Role" name="role" />
		<TextField label="Location" name="location" />
		<TextField label="Period" name="period" />
		<TextField label="Bullets" name="bullets" />

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
				max-height: 352px;
				padding-right: {data.length > 1 ? '1rem' : '0'};
				"
			>
				{#each data as { company, role }, i (`${company}-${i}}`)}
					<Card variant="contained">
						<p>{company}</p>
						<small class="muted">{role}</small>
					</Card>
				{/each}
			</div>
		</div>
	{/if}
</div>

<form onsubmit={handleSubmit} novalidate>
	<input hidden name="experience" value={JSON.stringify(data)} />

	<Button type="submit">Next</Button>
</form>
