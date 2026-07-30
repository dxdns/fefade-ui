<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements"
	import { classMapUtil } from "@fefade-ui/core"
	import styles from "./TableRow.module.css"

	interface Props extends Omit<HTMLAttributes<HTMLTableRowElement>, "color"> {}

	let { class: className = "", children, ...rest }: Props = $props()
</script>

<tr {...rest} class={classMapUtil(className, [className, styles], styles.row)}>
	{@render children?.()}
</tr>
