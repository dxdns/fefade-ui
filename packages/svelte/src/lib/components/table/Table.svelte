<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements"
	import { classMapUtil } from "@fefade-ui/core"
	import styles from "./Table.module.css"

	interface Props extends HTMLAttributes<HTMLTableElement> {}

	let { class: className = "", children, ...rest }: Props = $props()
</script>

<table
	{...rest}
	class={classMapUtil(className, [className, styles], styles.table)}
>
	{@render children?.()}
</table>
