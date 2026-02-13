<script lang="ts">
	import favicon from "$lib/assets/images/favicon.ico"
	import { Badge, Provider } from "@fefade-ui/svelte"

	let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Provider>
	<div
		style="
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		font-size: 14px;
		border-bottom: 1px solid #ccc;
		flex-wrap: wrap;
		padding: 1rem;
		font-weight: bold;
		"
	>
		<small>🔥 New: AI-Powered Workout Plans - 50% OFF This Week!</small>
		<Badge size="xs">Limited Time</Badge>
	</div>

	{@render children?.()}
</Provider>

<style>
	@font-face {
		font-family: "Inter";
		src: url("/fonts/Inter-Regular.woff") format("woff");
		font-weight: 400;
		font-style: normal;
		font-display: swap;
	}

	@font-face {
		font-family: "Inter";
		src: url("/fonts/Inter-Bold.woff") format("woff");
		font-weight: 700;
		font-style: normal;
		font-display: swap;
	}

	:global(*, *::before, *::after) {
		box-sizing: border-box;
	}

	:global(body) {
		font-family: "Inter", sans-serif;
		line-height: 1.2;
		overflow-x: hidden;
		margin: 0;
		padding: 0;
		background-image: radial-gradient(
			ellipse 80% 50% at 50% -20%,
			hsl(36deg 100% 50%),
			transparent
		);
	}

	:global(p, ul) {
		line-height: 1.5;
	}
</style>
