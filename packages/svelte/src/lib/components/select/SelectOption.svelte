<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements"
	import styles from "@fefade-ui/core/styles/SelectOption.module.css"
	import { classMapUtil } from "@fefade-ui/core/utils"

	interface Props extends HTMLAttributes<HTMLOptionElement> {
		value?: string | number
		selected?: boolean
		disabled?: boolean
	}

	let { class: className = "", children, ...rest }: Props = $props()
</script>

<option
	{...rest}
	class={classMapUtil(className, [className, styles], styles.option)}
>
	{@render children?.()}
</option>
