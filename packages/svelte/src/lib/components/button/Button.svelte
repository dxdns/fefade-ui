<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements"
	import {
		classMapUtil,
		handleClickUtil,
		type ButtonType,
		type HTMLAttrAnchor
	} from "@fefade-ui/core"
	import Spinner from "$lib/components/spinner/index.js"
	import styles from "@fefade-ui/core/styles/Button.module.css"

	interface Props extends HTMLButtonAttributes, ButtonType, HTMLAttrAnchor {}

	let {
		class: className = "",
		pressedEffect = true,
		variant = "contained",
		isLoading = false,
		roundedFull = false,
		size = "sm",
		href,
		target = "_self",
		download,
		children,
		...rest
	}: Props = $props()
</script>

<button
	{...rest}
	class={classMapUtil(
		className,
		[className, styles],
		[variant, styles],
		[size, styles],
		styles.button,
		{
			["roundedFull"]: roundedFull,
			[styles.pressedEffect]: pressedEffect
		}
	)}
	type={rest.type ?? "button"}
	onclick={(e) => {
		handleClickUtil({
			href,
			download,
			target,
			onClick: () => {
				rest.onclick?.(e)
			}
		})
	}}
>
	{#if isLoading}
		<Spinner />
	{:else}
		{@render children?.()}
	{/if}
</button>
