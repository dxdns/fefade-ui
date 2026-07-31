<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements"
	import { classMapUtil } from "@fefade-ui/core"
	import styles from "./TableHead.module.css"

	interface Props extends Omit<
		HTMLAttributes<HTMLTableSectionElement>,
		"color"
	> {}

	let { class: className = "", children, ...rest }: Props = $props()
</script>

<thead
	{...rest}
	class={classMapUtil(className, [className, styles], styles.tableHead)}
>
	{@render children?.()}
</thead>
