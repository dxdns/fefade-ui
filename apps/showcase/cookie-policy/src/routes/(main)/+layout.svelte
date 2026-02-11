<script lang="ts">
	import { getLocale, setLocale } from "$lib/paraglide/runtime"
	import { Button, Link } from "@fefade-ui/svelte"

	let { children } = $props()

	const locale = getLocale()
</script>

<div class="layout">
	<div class="languageSelector">
		<Button
			variant={locale !== "pt-br" ? "outlined" : "contained"}
			onclick={() => setLocale("pt-br")}>🇧🇷 pt-br</Button
		>
		<Button
			variant={locale !== "en" ? "outlined" : "contained"}
			onclick={() => setLocale("en")}>🇺🇸 en</Button
		>
	</div>

	<main class="content">
		{@render children()}
	</main>

	<footer class="footer muted">
		<div style="display: flex; align-items: baseline; gap: 0.5rem;">
			<span>&copy; 2025</span>
			<Link href="https://fefade.com" target="_blank" hover="right">fefade</Link>
		</div>
	</footer>
</div>

<style>
	.layout {
		display: grid;
		grid-template-rows: auto 1fr auto;
		grid-template-areas:
			"languageSelector"
			"content"
			"spacer"
			"footer";
		width: 800px;
		margin: 0 auto;
		min-height: 100vh;
		gap: 1rem;
		padding: 3rem 0;
	}

	.languageSelector {
		grid-area: languageSelector;
		justify-self: end;
	}

	.content {
		grid-area: content;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.footer {
		grid-area: footer;
		padding: 5rem 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}

	@media screen and (max-width: 768px) {
		.layout {
			width: 90%;
		}
	}
</style>
