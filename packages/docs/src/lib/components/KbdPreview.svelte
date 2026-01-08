<script lang="ts">
	import { Constants } from "@fefade-ui/core"
	import { Kbd } from "@fefade-ui/svelte"
</script>

{#each Constants.sizes as size (size)}
	<div>
		<Kbd {size}>Ctrl</Kbd>
		<Kbd {size}>K</Kbd>
	</div>
	<br />
	<br />
{/each}
