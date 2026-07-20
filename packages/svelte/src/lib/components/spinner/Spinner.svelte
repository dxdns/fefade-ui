<script lang="ts">
	import { classMapUtil, type SpinnerType } from "@fefade-ui/core"
	import type { HTMLAttributes } from "svelte/elements"
	import styles from "@fefade-ui/core/styles/Spinner.module.css"

	interface Props extends HTMLAttributes<HTMLSpanElement>, SpinnerType {}

	let { class: className = "", size = "sm", ...rest }: Props = $props()
</script>

<span
	{...rest}
	class={classMapUtil(
		className,
		[className, styles],
		[size, styles],
		styles.spinner
	)}
></span>
