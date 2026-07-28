<script lang="ts">
	import { DataTable } from "$lib/index.js"
</script>

<DataTable
	data={[
		{
			name: "Jhon",
			age: 30,
			expandable: {
				data: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
			}
		},
		{
			name: "Mary",
			age: 25
		},
		{
			name: "Mike",
			age: 22,
			expandable: {
				data: "Temporibus illum ratione neque ipsa. Fuga, odit eum?"
			}
		}
	]}
>
	{#snippet bodyRender({ key, value })}
		{#if key === "age"}
			<strong style="color: red;">{value}</strong>
		{:else}
			{value}
		{/if}
	{/snippet}

	{#snippet expandableRender({ row })}
		{#if row.expandable}
			<div style="padding: 1rem;">
				Info:
				{row.expandable.data}
			</div>
		{/if}
	{/snippet}
</DataTable>
