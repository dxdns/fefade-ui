<script lang="ts">
	import { goto } from "$app/navigation"
	import { Button, TextField } from "@fefade-ui/svelte"

	function handleSubmit(event: Event) {
		event.preventDefault()

		const form = new FormData(event.target as HTMLFormElement)

		const getString = (key: string): string => (form.get(key) as string) ?? ""

		const params = {
			name: getString("name"),
			phone: getString("phone"),
			location: getString("location"),
			email: getString("email"),
			linkedin: getString("linkedin"),
			website: getString("website"),
			objective: getString("objective")
		}

		goto(`/education?${new URLSearchParams(params).toString()}`)
	}
</script>

<h2>Personal data</h2>

<form onsubmit={handleSubmit} novalidate>
	<TextField name="name" label="Name" />
	<TextField name="phone" label="Phone" />
	<TextField name="location" label="Location" />
	<TextField name="email" label="Email" />
	<TextField name="linkedin" label="LinkedIn" />
	<TextField name="website" label="Website" />
	<TextField name="objective" label="Objective" />
	<Button type="submit">Next</Button>
</form>
