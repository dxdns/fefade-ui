<script lang="ts">
	import { page } from "$app/state"
	import { Button } from "@fefade-ui/svelte"
	import { onDestroy, onMount } from "svelte"
	import lottie, { type AnimationItem } from "lottie-web"
	import confettiAnimation from "$lib/assets/animations/Confetti.json"

	const searchParams = page.url.searchParams

	let containerEl: HTMLDivElement
	let animation: AnimationItem

	function handleClick() {
		const params = {
			...Object.fromEntries(searchParams.entries())
		}

		const url = `/generate?${new URLSearchParams(params).toString()}`

		const printWindow = window.open(url, "_blank")
		if (printWindow) {
			printWindow.document.close()
			printWindow.focus()
			printWindow.addEventListener("afterprint", () => {
				printWindow.close()
			})
			printWindow.print()
		}
	}

	onMount(() => {
		animation = lottie.loadAnimation({
			container: containerEl,
			renderer: "svg",
			loop: true,
			autoplay: true,
			animationData: confettiAnimation
		})
	})

	onDestroy(() => {
		animation?.destroy()
	})
</script>

<div
	bind:this={containerEl}
	style="
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	pointer-events: none;
	z-index: 9999;
	"
></div>

<h2>Ready for the next step?</h2>
<p>
	Your resume is the start of new opportunities. Believe in your potential and
	move forward with confidence!
</p>
<Button onclick={handleClick}>Generate</Button>
