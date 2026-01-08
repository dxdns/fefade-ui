<script lang="ts">
	import { DataTable } from "@fefade-ui/svelte"

	const data = Array.from(Array(10)).map((_, index) => ({
		id: index,
		label: `test-${index}`
	}))
</script>

<DataTable {data} />
