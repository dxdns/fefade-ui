<script lang="ts">
	import type { ToastType } from "@fefade-ui/core/types"
	import { classMapUtil } from "@fefade-ui/core/utils"
	import type { HTMLAttributes } from "svelte/elements"
	import Button from "../button/index.js"
	import { Alert } from "../alert/index.js"
	import { toastState } from "../../states/index.js"
	import ProgressLoader from "../progress-loader/index.js"
	import { closeIcon } from "@fefade-ui/core/icons"
	import styles from "@fefade-ui/core/styles/Toast.module.css"

	type Props = Omit<HTMLAttributes<HTMLDivElement>, "color" | "id"> & ToastType

	let {
		class: className = "",
		id,
		message,
		color = "info",
		isClosable = false,
		withProgressLoader = false,
		...rest
	}: Props = $props()

	const toast = toastState()
	const toastData = $derived(toast.data.get(id))
	const duration = $derived(toastData?.duration ?? 0)

	let timerValue = $state(0)
	let paused = $state(false)

	$effect(() => {
		const currentDuration = duration

		timerValue = currentDuration

		if (currentDuration <= 0) return

		const interval = setInterval(() => {
			if (!paused && timerValue > 0) {
				timerValue = Math.max(timerValue - 100, 0)
			}
		}, 100)

		return () => clearInterval(interval)
	})

	$effect(() => {
		if (duration > 0 && timerValue <= 0) {
			toast.remove(id)
		}
	})

	const progress = $derived(duration > 0 ? (timerValue / duration) * 100 : 0)
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
			<ProgressLoader value={progress} {color} />
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
				toast.remove(id)
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
