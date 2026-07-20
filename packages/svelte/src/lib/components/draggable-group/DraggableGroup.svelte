<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements"
	import {
		draggableGroupAction,
		classMapUtil,
		mergeStyleUtil,
		type DraggableGroupType
	} from "@fefade-ui/core"
	import styles from "@fefade-ui/core/styles/DraggableGroup.module.css"
	import stylesItem from "@fefade-ui/core/styles/DraggableGroupItem.module.css"

	interface Props extends HTMLAttributes<HTMLDivElement>, DraggableGroupType {}

	let {
		class: className = "",
		onChange,
		cols,
		gap,
		children,
		...rest
	}: Props = $props()
</script>

<div
	{...rest}
	id="draggableGroup"
	use:draggableGroupAction={{
		onChange,
		styles: stylesItem
	}}
	class={classMapUtil(className, styles.draggableGroup)}
	style={mergeStyleUtil(
		`--cols: ${cols};`,
		`--gap: ${(gap * 4) / 16}rem;`,
		rest.style
	)}
>
	{@render children?.()}
</div>
