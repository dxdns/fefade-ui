<script lang="ts" generics="T extends Record<string, unknown>">
	import type { HTMLAttributes } from "svelte/elements"
	import {
		classMapUtil,
		keyboardArrowDownIcon,
		keyboardArrowRightIcon
	} from "@fefade-ui/core"
	import styles from "./DataTable.module.css"
	import { SvelteSet } from "svelte/reactivity"
	import type { Snippet } from "svelte"

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

	const columnKeys =
		data.length > 0
			? Object.keys(data[0]).filter((key) => key !== "expandable")
			: []

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

{#snippet arrowDownIcon()}
	<svg
		class={styles.icon}
		viewBox="0 -960 960 960"
		style="
		display: inline-block; 
		vertical-align: middle;
		fill: currentColor;
		width: 24px;
		height: 24px;
		"
	>
		<path d={keyboardArrowDownIcon}></path>
	</svg>
{/snippet}

{#snippet arrowUpIcon()}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		height="24px"
		viewBox="0 -960 960 960"
		width="24px"
		fill="#e3e3e3"><path d={keyboardArrowRightIcon} /></svg
	>
{/snippet}

<table
	{...rest}
	class={classMapUtil(className, [className, styles], styles.table)}
>
	<thead>
		<tr>
			{#if hasExpandableColumn}
				<th></th>
			{/if}

			{#each columnKeys as key (key)}
				<th>{key}</th>
			{/each}
		</tr>
	</thead>

	<tbody>
		{#each data as row, i (i)}
			<tr
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
					<td>
						{#if canExpand(row)}
							{#if expanded.has(i)}
								{@render arrowDownIcon()}
							{:else}
								{@render arrowUpIcon()}
							{/if}
						{/if}
					</td>
				{/if}

				{#each columnKeys as key (key)}
					{@const value = row[key] as T[keyof T]}

					<td>
						{@render bodyRender?.({
							key,
							value,
							index: i,
							row,
							expanded: expanded.has(i),
							toggle: () => toggle(i)
						})}
					</td>
				{/each}
			</tr>

			{#if canExpand(row) && expanded.has(i)}
				<tr>
					<td
						colspan={hasExpandableColumn
							? columnKeys.length + 1
							: columnKeys.length}
					>
						{@render expandableRender?.({
							row,
							index: i
						})}
					</td>
				</tr>
			{/if}
		{/each}
	</tbody>
</table>
