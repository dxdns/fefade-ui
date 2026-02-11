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

<section id="legal-basis">
	<h2>{m["legalBasis.title"]()}</h2>
	<p>{m["legalBasis.description"]()}</p>
</section>

<section id="information-we-collect">
	<h2>{m["informationWeCollect.title"]()}</h2>
	<ul>
		<li>{m["informationWeCollect.items.identification"]()}</li>
		<li>{m["informationWeCollect.items.navigation"]()}</li>
		<li>{m["informationWeCollect.items.usage"]()}</li>
	</ul>
</section>

<section id="purpose-of-use">
	<h2>{m["purposeOfUse.title"]()}</h2>
	<ul>
		<li>{m["purposeOfUse.items.service"]()}</li>
		<li>{m["purposeOfUse.items.communication"]()}</li>
		<li>{m["purposeOfUse.items.legal"]()}</li>
		<li>{m["purposeOfUse.items.security"]()}</li>
	</ul>
</section>

<section id="data-sharing">
	<h2>{m["dataSharing.title"]()}</h2>
	<p>{m["dataSharing.description"]()}</p>
</section>

<section id="data-retention">
	<h2>{m["dataRetention.title"]()}</h2>
	<p>{m["dataRetention.description"]()}</p>
</section>

<section id="your-rights">
	<h2>{m["yourRights.title"]()}</h2>
	<ul>
		<li>{m["yourRights.items.confirmation"]()}</li>
		<li>{m["yourRights.items.access"]()}</li>
		<li>{m["yourRights.items.correction"]()}</li>
		<li>{m["yourRights.items.anonymization"]()}</li>
		<li>{m["yourRights.items.portability"]()}</li>
		<li>{m["yourRights.items.deletion"]()}</li>
		<li>{m["yourRights.items.information"]()}</li>
		<li>{m["yourRights.items.consent"]()}</li>
	</ul>
</section>

<section id="data-security">
	<h2>{m["dataSecurity.title"]()}</h2>
	<p>{m["dataSecurity.description"]()}</p>
</section>

<section id="changes">
	<h2>{m["changes.title"]()}</h2>
	<p>{m["changes.description"]()}</p>
</section>

<section id="contact">
	<h2>{m["contact.title"]()}</h2>
	<p>
		{m["contact.description"]()}
		<Link href="mailto:support@fefade.com" hover="underlineNone"
			>support@fefade.com</Link
		>
	</p>
</section>
