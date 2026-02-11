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

<section id="user-responsibilities">
	<h2>{m["userResponsibilities.title"]()}</h2>
	<ul>
		<li>{m["userResponsibilities.items.accuracy"]()}</li>
		<li>{m["userResponsibilities.items.lawfulUse"]()}</li>
		<li>{m["userResponsibilities.items.accountSecurity"]()}</li>
		<li>{m["userResponsibilities.items.respect"]()}</li>
	</ul>
</section>

<section id="prohibited-uses">
	<h2>{m["prohibitedUses.title"]()}</h2>
	<ul>
		<li>{m["prohibitedUses.items.illegal"]()}</li>
		<li>{m["prohibitedUses.items.interference"]()}</li>
		<li>{m["prohibitedUses.items.unauthorizedAccess"]()}</li>
		<li>{m["prohibitedUses.items.distribution"]()}</li>
	</ul>
</section>

<section id="intellectual-property">
	<h2>{m["intellectualProperty.title"]()}</h2>
	<p>{m["intellectualProperty.description"]()}</p>
</section>

<section id="service-availability">
	<h2>{m["serviceAvailability.title"]()}</h2>
	<p>{m["serviceAvailability.description"]()}</p>
</section>

<section id="modifications">
	<h2>{m["modifications.title"]()}</h2>
	<p>{m["modifications.description"]()}</p>
</section>

<section id="limitation-of-liability">
	<h2>{m["limitationOfLiability.title"]()}</h2>
	<p>{m["limitationOfLiability.description"]()}</p>
</section>

<section id="termination">
	<h2>{m["termination.title"]()}</h2>
	<p>{m["termination.description"]()}</p>
</section>

<section id="applicable-law">
	<h2>{m["applicableLaw.title"]()}</h2>
	<p>{m["applicableLaw.description"]()}</p>
</section>

<section id="contact">
	<h2>{m["contact.title"]()}</h2>
	<p>
		{m["contact.description"]()}
		<Link href="mailto:support@fefade.com" hover="underlineNone">support@fefade.com</Link>
	</p>
</section>
