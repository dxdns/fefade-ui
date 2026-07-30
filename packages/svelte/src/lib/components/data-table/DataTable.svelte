<script lang="ts" generics="T extends object">
	import type { HTMLAttributes } from "svelte/elements"
	import { SvelteSet } from "svelte/reactivity"
	import type { Snippet } from "svelte"
	import Table from "../table/index.js"

	interface Props extends HTMLAttributes<HTMLTableElement> {
		data: T[]
		bodyRender: Snippet<
			[
				{
					key: keyof T
					value: T[keyof T]
					index: number
					row: T
					expanded: boolean
					toggle: () => void
				}
			]
		>
		expandableRender?: Snippet<[{ row: T; index: number }]>
	}

	let {
		class: className = "",
		data = $bindable<T[]>([]),
		bodyRender,
		expandableRender,
		...rest
	}: Props = $props()

	const expanded = new SvelteSet<number>()

	const hasExpandableColumn = $derived(data.some((row) => canExpand(row)))

	const columnKeys = $derived(
		data.length > 0
			? Object.keys(data[0]).filter((key) => key !== "expandable")
			: []
	)

	function toggle(index: number) {
		if (expanded.has(index)) {
			expanded.delete(index)
		} else {
			expanded.add(index)
		}
	}

	function canExpand(row: T) {
		return "expandable" in row && Boolean(row.expandable)
	}
</script>

<Table {...rest}>
	<Table.Head>
		<Table.Row>
			{#if hasExpandableColumn}
				<th></th>
			{/if}

			{#each columnKeys as key (key)}
				<th>{key}</th>
			{/each}
		</Table.Row>
	</Table.Head>

	<tbody>
		{#each data as row, i (i)}
			<Table.Row
				style="
				cursor: {canExpand(row) ? 'pointer' : 'auto'}; 
				user-select: {canExpand(row) ? 'none' : 'auto'};
				"
				onclick={canExpand(row)
					? () => {
							toggle(i)
						}
					: undefined}
			>
				{#if hasExpandableColumn}
					<Table.Cell>
						{#if canExpand(row)}
							<Table.ExpandButton expanded={expanded.has(i)} />
						{/if}
					</Table.Cell>
				{/if}

				{#each columnKeys as key (key)}
					{@const value = row[key as keyof T]}

					<Table.Cell>
						{@render bodyRender?.({
							key: key as keyof T,
							value,
							index: i,
							row,
							expanded: expanded.has(i),
							toggle: () => toggle(i)
						})}
					</Table.Cell>
				{/each}
			</Table.Row>

			{#if canExpand(row) && expanded.has(i)}
				<Table.Row>
					<Table.Cell
						colspan={hasExpandableColumn
							? columnKeys.length + 1
							: columnKeys.length}
					>
						{@render expandableRender?.({
							row,
							index: i
						})}
					</Table.Cell>
				</Table.Row>
			{/if}
		{/each}
	</tbody>
</Table>
