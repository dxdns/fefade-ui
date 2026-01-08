<script lang="ts">
	import { Constants } from "@fefade-ui/core"
	import { RadioButton } from "@fefade-ui/svelte"
</script>

{#each Constants.sizes as size, i (size)}
	<RadioButton label={size} checked={Boolean(i % 2)} {size} />
{/each}

{#each Constants.statusColors as color (color)}
	<RadioButton label={color} name="test" {color} />
{/each}
