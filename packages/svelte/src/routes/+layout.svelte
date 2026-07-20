<script lang="ts">
	import { createTheme } from "@fefade-ui/core"
	import { Provider } from "$lib/index.js"

	let { children } = $props()

	const theme = createTheme({
		colors: { light: { bg: "white" } },
		breakpoints: { md: "800px" }
	})
</script>

<svelte:head>
	<title>Fefade UI + Svelte</title>
</svelte:head>

<Provider {theme} defaultThemeMode="light">
	{@render children()}
</Provider>
