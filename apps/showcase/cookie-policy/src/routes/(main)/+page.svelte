<script lang="ts">
	import { m } from "$lib/paraglide/messages.js"
	import { Link } from "@fefade-ui/svelte"

	let { data } = $props()
</script>

<svelte:head>
	<title>{m["title"]()} | {data.title}</title>
	<meta name="description" content={m["introduction"]()} />
</svelte:head>

<header>
	<h1>{m["title"]()}</h1>
	<p>{m["introduction"]()}</p>
</header>

<section id="what-are-cookies">
	<h2>{m["whatAreCookies.title"]()}</h2>
	<p>{m["whatAreCookies.description"]()}</p>
</section>

<section id="why-we-use-cookies">
	<h2>{m["whyWeUseCookies.title"]()}</h2>
	<ul>
		<li>
			<strong>{m["whyWeUseCookies.items.essential"]().split(":")[0]}:</strong>
			{m["whyWeUseCookies.items.essential"]().split(":")[1]}
		</li>
		<li>
			<strong>{m["whyWeUseCookies.items.performance"]().split(":")[0]}:</strong>
			{m["whyWeUseCookies.items.performance"]().split(":")[1]}
		</li>
		<li>
			<strong
				>{m["whyWeUseCookies.items.functionality"]().split(":")[0]}:</strong
			>
			{m["whyWeUseCookies.items.functionality"]().split(":")[1]}
		</li>
		<li>
			<strong>{m["whyWeUseCookies.items.marketing"]().split(":")[0]}:</strong>
			{m["whyWeUseCookies.items.marketing"]().split(":")[1]}
		</li>
	</ul>
</section>

<section id="control-cookies">
	<h2>{m["controlCookies.title"]()}</h2>
	<p>{m["controlCookies.description"]()}</p>
</section>

<section id="changes">
	<h2>{m["changes.title"]()}</h2>
	<p>{m["changes.description"]()}</p>
</section>

<section id="contact">
	<h2>{m["contact.title"]()}</h2>
	<p>
		{m["contact.description"]()}
		<Link href="mailto:support@fefade.com" hover="underlineNone">
			support@fefade.com
		</Link>
	</p>
</section>
