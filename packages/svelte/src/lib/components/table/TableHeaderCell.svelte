<script lang="ts">
	import type { HTMLThAttributes } from "svelte/elements"
	import { classMapUtil } from "@fefade-ui/core"
	import styles from "./TableHeaderCell.module.css"

	interface Props extends Omit<HTMLThAttributes, "color"> {}

	let { class: className = "", children, ...rest }: Props = $props()
</script>

<th
	{...rest}
	class={classMapUtil(className, [className, styles], styles.tableHeaderCell)}
>
	{@render children?.()}
</th>
