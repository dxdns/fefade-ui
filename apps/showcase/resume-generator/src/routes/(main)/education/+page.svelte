<script lang="ts">
	import { goto } from "$app/navigation"
	import { page } from "$app/state"
	import type { EducationEntry } from "$lib/types"
	import { Button, Card, Textarea, TextField } from "@fefade-ui/svelte"

	const searchParams = page.url.searchParams

	let data: EducationEntry[] = $state([])

	function handleAdd(event: Event) {
		event.preventDefault()

		const form = new FormData(event.target as HTMLFormElement)

		const getString = (key: string): string => (form.get(key) as string) ?? ""

		data = [
			...data,
			{
				degree: getString("degree"),
				school: getString("school"),
				years: getString("years"),
				details: getString("details")
			}
		]
	}

	function handleSubmit(event: Event) {
		event.preventDefault()

		const form = new FormData(event.target as HTMLFormElement)

		const params = {
			education: form.get("education") as string,
			...Object.fromEntries(searchParams.entries())
		}

		goto(`/skills?${new URLSearchParams(params).toString()}`)
	}
</script>

<h2>Education</h2>

<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
	<form onsubmit={handleAdd} style="flex-grow: 1;" novalidate>
		<TextField label="Degree" name="degree" />
		<TextField label="School" name="school" />
		<TextField label="Years" name="years" />
		<Textarea name="details" placeholder="Details..." />

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
				max-height: 312px;
				padding-right: {data.length > 1 ? '1rem' : '0'};
				"
			>
				{#each data as { degree, school }, i (`${degree}-${i}}`)}
					<Card variant="contained">
						<p>{school}</p>
						<small class="muted">{degree}</small>
					</Card>
				{/each}
			</div>
		</div>
	{/if}
</div>

<form onsubmit={handleSubmit} novalidate>
	<input hidden name="education" value={JSON.stringify(data)} />

	<Button type="submit">Next</Button>
</form>
