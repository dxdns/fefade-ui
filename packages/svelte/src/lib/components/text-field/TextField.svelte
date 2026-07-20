<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements"
	import { classMapUtil, actionUtil, type TextFieldType } from "@fefade-ui/core"
	import styles from "@fefade-ui/core/styles/TextField.module.css"

	interface Props extends Omit<HTMLInputAttributes, "size">, TextFieldType {}

	let {
		class: className = "",
		label,
		variant = "outlined",
		focused = false,
		actions,
		size = "md",
		...rest
	}: Props = $props()

	let el: HTMLInputElement | undefined = $state()

	$effect(() => {
		if (!el) return

		if (focused) {
			el.focus()
		}
	})
</script>

<div
	class={classMapUtil(
		className,
		[className, styles],
		[variant, styles],
		[size, styles],
		styles.textField,
		{
			[styles.labelEmpty]: !label
		}
	)}
>
	<input
		{...rest}
		bind:this={el}
		placeholder={rest.placeholder ?? " "}
		use:actionUtil={actions}
		style={undefined}
	/>

	{#if label}
		<label for={rest.id ?? rest.name}>{label}</label>
	{/if}

	<fieldset>
		<legend>
			<span>{label}</span>
		</legend>
	</fieldset>
</div>
