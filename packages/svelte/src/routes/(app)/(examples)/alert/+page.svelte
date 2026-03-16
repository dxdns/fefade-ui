<script lang="ts">
	import { Alert } from "$lib/index.js"
	import { Constants } from "@fefade-ui/core"
</script>

<br />

{#each Constants.statusColors as color (color)}
	<Alert {color}>
		<p>test</p>
	</Alert>
	<br />
{/each}
