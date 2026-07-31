<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements"
	import { classMapUtil } from "@fefade-ui/core"
	import styles from "./ExpandButton.module.css"

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
		expanded: boolean
	}

	let { class: className = "", expanded, ...rest }: Props = $props()
</script>

<div
	{...rest}
	class={classMapUtil(className, [className, styles], styles.expandButton, {
		[styles.active]: expanded
	})}
></div>
