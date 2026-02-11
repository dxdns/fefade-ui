<script lang="ts">
	import { page } from "$app/state"
	import { Button, Link } from "@fefade-ui/svelte"

	let { data, children } = $props()

	const pathname = $derived(page.url.pathname)
</script>

<svelte:head>
	<title>Resume Generator | {data.title}</title>
	<meta
		name="description"
		content="Easily generate a professional resume. Customize sections like work experience, education, skills, and projects. Fast, simple, and ideal for job applications."
	/>
</svelte:head>

<div class="container">
	{#if pathname !== "/"}
		<Button
			title="go back"
			variant="outlined"
			onclick={() => {
				history.back()
			}}
			style="width: fit-content; align-self: flex-end;"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				viewBox="0 0 16 16"
			>
				<path
					fill-rule="evenodd"
					d="M15 8a.5.5 0 0 1-.5.5H3.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708.708L3.707 7.5H14.5a.5.5 0 0 1 .5.5z"
				/>
			</svg>
		</Button>
	{/if}
	{@render children()}
</div>

<footer class="footer muted">
	<div>
		<span>&copy; 2025</span>
		<Link href="https://dxdns.dev" target="_blank" hover="right">dxdns</Link>
	</div>

	<Link
		hover="underlineNone"
		href="https://github.com/sponsors/dxdns"
		target="_blank"
	>
		<small>
			<span style="filter: invert(0.5);">❤️</span>
			Sponsor this project
		</small>
	</Link>
</footer>

<style>
	:global(form) {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.container {
		width: 600px;
		margin: 0 auto;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1rem;
	}

	.footer {
		padding: 5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}

	@media (max-width: 425px) {
		.container {
			width: 80%;
		}
	}
</style>
