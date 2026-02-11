<script lang="ts">
	import { Constants } from "@fefade-ui/core"
	import { SearchInput } from "@fefade-ui/svelte"
</script>

<div
	style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px; margin: 1rem auto;"
>
	{#each Constants.variants as variant (variant)}
		<SearchInput placeholder={variant} {variant} />
	{/each}
</div>
