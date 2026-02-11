<script lang="ts">
	import { Provider } from "@fefade-ui/svelte"
	import favicon from "$lib/assets/images/favicon.ico"

	let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="canonical" href="https://radio.fefade.com" />
</svelte:head>

<Provider defaultThemeMode="dark">
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
		user-select: none;
	}

	:global(p, ul) {
		line-height: 1.5;
	}
</style>
