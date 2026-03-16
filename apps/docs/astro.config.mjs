// @ts-check
import { defineConfig } from "astro/config"
import starlight from "@astrojs/starlight"
import svelte from "@astrojs/svelte"
import path from "path"
import react from "@astrojs/react"
import vue from "@astrojs/vue"
import sitemap from "@astrojs/sitemap"

const googleAnalyticsId = "G-FZ5T41CT85"

// https://astro.build/config
export default defineConfig({
	site: "https://ui.fefade.com",
	integrations: [
		sitemap(),
		starlight({
			title: "fefade ui",
			titleDelimiter: " | ",
			defaultLocale: "root",
			head: [
				{
					tag: "script",
					attrs: {
						async: true,
						src: `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`
					}
				},
				{
					tag: "script",
					content: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', '${googleAnalyticsId}');
					`
				}
			],
			locales: {
				root: {
					label: "English",
					lang: "en"
				},
				"pt-br": {
					label: "Português do Brasil",
					lang: "pt-BR"
				}
			},
			components: {
				PageFrame: "./src/lib/layouts/RootLayout.astro",
				Hero: "./src/lib/components/Hero.astro",
				PageTitle: "./src/lib/components/PageTitle.astro"
			},
			customCss: ["./src/styles/custom.css", "./src/fonts/font-face.css"],
			favicon: "/icon-32.png",
			logo: {
				src: "./public/icon-180.png",
				alt: "logo",
				replacesTitle: true
			},
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/fefade/ui"
				}
			],
			sidebar: [
				{
					label: "Introduction",
					slug: "introduction",
					translations: {
						"pt-BR": "Introdução"
					}
				},
				{
					label: "Installation",
					slug: "installation"
				},
				{
					label: "Theming",
					slug: "theming"
				},
				{
					label: "Components",
					slug: "components"
				},
				{
					label: "Templates",
					slug: "templates"
				},
				{
					label: "Frameworks",
					collapsed: false,
					items: [
						{
							label: "Svelte",
							collapsed: true,
							items: [
								{
									label: "Getting Started",
									autogenerate: {
										directory: "frameworks/svelte/getting-started"
									}
								},
								{
									label: "Components",
									autogenerate: {
										directory: "frameworks/svelte/components"
									}
								},
								{
									label: "Utils",
									autogenerate: {
										directory: "frameworks/svelte/utils"
									}
								}
							]
						},
						{
							label: "React",
							collapsed: true,
							items: [
								{
									label: "Getting Started",
									autogenerate: {
										directory: "frameworks/react/getting-started"
									}
								},
								{
									label: "Components",
									autogenerate: {
										directory: "frameworks/react/components"
									}
								},
								{
									label: "Utils",
									autogenerate: {
										directory: "frameworks/react/utils"
									}
								}
							]
						},
						{
							label: "Vue",
							collapsed: true,
							items: [
								{
									label: "Getting Started",
									autogenerate: {
										directory: "frameworks/vue/getting-started"
									}
								},
								{
									label: "Components",
									autogenerate: {
										directory: "frameworks/vue/components"
									}
								}
							]
						}
					]
				}
			]
		}),
		svelte(),
		react(),
		vue()
	],
	vite: {
		resolve: {
			alias: {
				"@": path.resolve("./src/lib")
			}
		}
	}
})
