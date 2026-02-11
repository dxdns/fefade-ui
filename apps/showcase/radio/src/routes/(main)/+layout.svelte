<script lang="ts">
	import { Link } from "@fefade-ui/svelte"

	let { children } = $props()
</script>

<div class="layout">
	<main class="content">
		{@render children()}
	</main>

	<footer class="footer muted">
		<div style="display: flex; align-items: baseline; gap: 0.5rem;">
			<span>&copy; 2025</span>
			<Link href="https://fefade.com" target="_blank" hover="right">fefade</Link
			>
		</div>
	</footer>
</div>

<style>
	.layout {
		display: grid;
		grid-template-rows: auto 1fr auto;
		grid-template-areas:
			"content"
			"spacer"
			"footer";
		width: 1000px;
		margin: 0 auto;
		min-height: 100vh;
		gap: 1rem;
		padding: 3rem 0;
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
