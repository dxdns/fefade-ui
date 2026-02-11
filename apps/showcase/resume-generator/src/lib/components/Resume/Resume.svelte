<script lang="ts">
	import type { ResumeDataType } from "$lib/types"

	interface Props extends ResumeDataType {}

	let {
		name,
		phone,
		location,
		email,
		linkedin,
		website,
		objective,
		education,
		skills,
		experience,
		projects,
		activities,
		leadership
	}: Props = $props()
</script>

<div class="resume">
	<div class="header">{name}</div>
	<div class="contact">
		<div>{phone} ⋄ {location}</div>
		<div>{email} ⋄ {linkedin} ⋄ {website}</div>
	</div>

	{#if objective}
		<section>
			<div class="section-title">Objective</div>
			<p>{objective}</p>
		</section>
	{/if}

	{#if education.length}
		<section>
			<div class="section-title">Education</div>
			{#each education as edu, i (`${edu}-${i}`)}
				<p>
					<strong>{edu.degree}</strong>, {edu.school} — <em>{edu.years}</em>
				</p>
				{#if edu.details}<p>{edu.details}</p>{/if}
			{/each}
		</section>
	{/if}

	{#if skills.length}
		<section>
			<div class="section-title">Skills</div>
			{#each skills as skill, i (`${skill}-${i}`)}
				<p><strong>{skill.label}</strong>: {skill.items}</p>
			{/each}
		</section>
	{/if}

	{#if experience.length}
		<section>
			<div class="section-title">Experience</div>
			{#each experience as exp, i (`${exp}-${i}`)}
				<p class="role">{exp.role} <span>{exp.period}</span></p>
				<p class="company">{exp.company}, {exp.location}</p>
				<ul>
					{#each exp.bullets as bullet, i (`${bullet}-${i}`)}
						<li>{bullet}</li>
					{/each}
				</ul>
			{/each}
		</section>
	{/if}

	{#if projects.length}
		<section>
			<div class="section-title">Projects</div>
			{#each projects as proj, i (`${proj}-${i}`)}
				<div class="project-title">{proj.title}</div>
				<p>{proj.description}</p>
			{/each}
		</section>
	{/if}

	{#if activities.length}
		<section>
			<div class="section-title">Extra-Curricular Activities</div>
			<ul>
				{#each activities as item, i (`${item}-${i}`)}<li>{item}</li>{/each}
			</ul>
		</section>
	{/if}

	{#if leadership.length}
		<section>
			<div class="section-title">Leadership</div>
			<ul>
				{#each leadership as item, i (`${item}-${i}`)}<li>{item}</li>{/each}
			</ul>
		</section>
	{/if}
</div>

<style>
	:global(body) {
		font-family: Arial, sans-serif;
		margin: 0;
		padding: 1cm;
	}

	.resume {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
		color: #000;
		font-size: 14px;
		line-height: 1.5;
	}

	.header {
		text-align: center;
		font-weight: bold;
		font-size: 20px;
		margin-bottom: 0.5rem;
	}

	.contact {
		text-align: center;
		font-size: 13px;
		margin-bottom: 1.5rem;
	}

	.contact div {
		margin: 0.2rem 0;
	}

	section {
		margin-bottom: 1.5rem;
	}

	.section-title {
		font-weight: bold;
		text-transform: uppercase;
		font-size: 14px;
		margin-bottom: 0.5rem;
		border-bottom: 1px solid #000;
	}

	ul {
		list-style: disc;
		padding-left: 1.2rem;
	}

	.role {
		font-weight: bold;
	}

	.company {
		font-style: italic;
		margin-bottom: 0.3rem;
	}

	.project-title {
		font-weight: bold;
		margin-bottom: 0.2rem;
	}

	@media print {
		@page {
			margin: 0;
		}
	}
</style>
