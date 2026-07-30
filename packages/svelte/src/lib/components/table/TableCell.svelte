<script lang="ts">
	import type { HTMLTdAttributes } from "svelte/elements"
	import { classMapUtil } from "@fefade-ui/core"
	import styles from "./TableCell.module.css"

	interface Props extends Omit<HTMLTdAttributes, "color"> {}

	let { class: className = "", children, ...rest }: Props = $props()
</script>

<td {...rest} class={classMapUtil(className, [className, styles], styles.cell)}>
	{@render children?.()}
</td>
