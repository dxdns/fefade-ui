<script lang="ts">
	import type { ToastType } from "@fefade-ui/core/types"
	import { classMapUtil } from "@fefade-ui/core/utils"
	import type { HTMLAttributes } from "svelte/elements"
	import Button from "../button/index.js"
	import { Alert } from "../alert/index.js"
	import { toastState } from "../../states/index.js"
	import { onDestroy } from "svelte"
	import ProgressLoader from "../progress-loader/index.js"
	import { closeIcon } from "@fefade-ui/core/icons"
	import styles from "@fefade-ui/core/styles/Toast.module.css"
	import { Constants } from "@fefade-ui/core"

	interface Props
		extends Omit<Omit<HTMLAttributes<HTMLDivElement>, "color">, "id">,
			ToastType {}

	let {
		class: className = "",
		id,
		message,
		color = "info",
		isClosable = false,
		withProgressLoader = false,
		...rest
	}: Props = $props()

	const _toastState = toastState()
	const toast = $derived(_toastState.data.get(id))
	const duration = $derived(toast?.duration ?? 3000)

	let timerValue = $state(Constants.TOAST_DEFAULT_DURATION)
	let paused = $state(false)

	const interval = setInterval(() => {
		if (!paused && timerValue > 0) {
			timerValue = Math.max(timerValue - 100, 0)
		}
	}, 100)

	$effect(() => {
		timerValue = duration

		if (timerValue <= 0) {
			_toastState.remove(id)
		}
	})

	onDestroy(() => {
		clearInterval(interval)
	})
</script>

<Alert
	{...rest}
	class={classMapUtil(className, styles.toast)}
	onmouseenter={() => {
		paused = true
	}}
	onmouseleave={() => {
		paused = false
	}}
	{color}
>
	<div class={styles.wrapper}>
		<div class={styles.message}>
			{message}
		</div>
		{#if withProgressLoader}
			<ProgressLoader value={(timerValue / duration) * 100} {color} />
		{/if}
	</div>
	{#if isClosable}
		<Button
			roundedFull
			size="xs"
			style="
			padding: 0; 
			height: 20px;
			min-width: 20px;
			"
			onclick={() => {
				_toastState.remove(id)
			}}
		>
			<svg
				viewBox="0 -960 960 960"
				style="
				display: inline-block; 
				vertical-align: middle;
				fill: currentColor;
				width: 16px;
				height: 16px;
				"
			>
				<path d={closeIcon}></path>
			</svg>
		</Button>
	{/if}
</Alert>
