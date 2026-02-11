<script lang="ts">
	import apiService from "$lib/services/apiService.js"
	import {
		Button,
		TextField,
		FileInput,
		PasswordInput,
		Select,
		Switch,
		Tab,
		Link
	} from "@fefade-ui/svelte"
	import { nanoid } from "nanoid"

	let { data } = $props()

	type OutputType = "text" | "wifi"
	type WifiSecurityType = "wpa" | "wep" | "sae" | "nopass"
	type WifiType = {
		ssid: string
		security: WifiSecurityType
		password: string
		hidden: boolean
	}

	const api = apiService()
	const wifiValuesDefault = {
		ssid: "",
		security: "wpa",
		password: "",
		hidden: false
	} as WifiType

	let isLoading = $state(false)
	let imageQrCodeSrc: string | null = $state(null)
	let imageSrcPreview: string | null = $state(null)
	let contentInput: string | null = $state(null)
	let imageInput: File | undefined = $state()
	let outputType: OutputType = $state("text")
	let wifi = $state<WifiType>(wifiValuesDefault)

	async function selectFile(files: File[]) {
		imageInput = files[0]
		const imageUrl = URL.createObjectURL(imageInput)
		imageSrcPreview = imageUrl
	}

	function getContent() {
		const inputValue = outputType === "text" ? contentInput : wifi

		if (!inputValue) return
		if (typeof inputValue === "string") return contentInput

		const hasEmptyValues = Object.values(inputValue).some(
			(value) => value === null || value === undefined || value === ""
		)

		if (hasEmptyValues) return

		const { ssid, security, password, hidden } = inputValue
		const hiddenStr = hidden ? ";H:true" : ""
		const base = `WIFI:T:${security};S:${ssid}`

		return security === "nopass"
			? `${base}${hiddenStr};;`
			: `${base};P:${password}${hiddenStr};;`
	}

	async function generate() {
		try {
			isLoading = true

			const content = getContent()

			if (!content) return

			const formData = new FormData()

			if (imageInput) {
				formData.append("image", imageInput)
			}

			formData.append("content", content)

			const response = await api.generate(formData)
			if (!response.ok) throw new Error("error generate qr code")

			const imageBlob = await response.blob()
			const imageUrl = URL.createObjectURL(imageBlob)

			imageQrCodeSrc = imageUrl
		} finally {
			isLoading = false
		}
	}

	function reset() {
		contentInput = ""
		imageInput = undefined
		imageQrCodeSrc = null
		imageSrcPreview = null
		wifi = wifiValuesDefault
	}

	function output() {
		const nanoId = nanoid()
		return `${nanoId}.png`
	}

	function download() {
		if (!imageQrCodeSrc) return
		const a = document.createElement("a")
		a.href = imageQrCodeSrc
		a.download = output()
		a.click()
	}
</script>

<svelte:head>
	<title>QR Code generator | {data.title}</title>
	<meta name="description" content="Qr Code generator with image" />
</svelte:head>

<div class="container">
	<h1>QR Code generator</h1>
	<p class="muted">
		Enter a URL and optionally upload an image to generate a customized QR Code.
	</p>
	<Tab>
		<Tab.List scrollable={false}>
			<Button
				style="flex:1;"
				variant="text"
				onclick={() => {
					if (outputType !== "text") {
						reset()
					}
					outputType = "text"
				}}
			>
				Text
			</Button>
			<Button
				style="flex:1;"
				variant="text"
				onclick={() => {
					if (outputType !== "wifi") {
						reset()
					}
					outputType = "wifi"
				}}
			>
				Wi-Fi
			</Button>
		</Tab.List>

		<Tab.Panel
			isActive={outputType === "text"}
			style="padding: 1rem 0.5rem 0px 9px;"
		>
			<TextField
				title="text content"
				required
				label="Text"
				oninput={(e) => {
					const { value } = e.target as HTMLInputElement
					contentInput = value
					if (value === "") reset()
				}}
				onkeydown={(e) => {
					if (e.key === "Enter" && contentInput) generate()
				}}
				value={contentInput}
			/>
		</Tab.Panel>

		<Tab.Panel
			isActive={outputType === "wifi"}
			style="padding: 1rem 0.5rem 0px 9px;"
		>
			<div style="display:flex; flex-direction:column; gap: 1rem;">
				<TextField
					required
					title="network name"
					label="Network name"
					oninput={(e) => {
						const { value } = e.target as HTMLInputElement
						wifi.ssid = value
					}}
					value={wifi.ssid}
				/>
				<PasswordInput
					required
					label="Password"
					oninput={(e) => {
						const { value } = e.target as HTMLInputElement
						wifi.password = value
					}}
					value={wifi.password}
				/>
				<Switch
					required
					size="sm"
					label="Is this a hidden wifi network?"
					onchange={(e) => {
						wifi.hidden = e.currentTarget.checked
					}}
				/>
				<Select
					required
					onchange={(e) => {
						wifi.security = e.currentTarget.value as WifiSecurityType
					}}
				>
					{#each ["wpa", "wep", "sae", "nopass"] as type, i (`${type}-${i}`)}
						<option value={type}>{type.toUpperCase()}</option>
					{/each}
				</Select>
			</div>
		</Tab.Panel>
	</Tab>

	{#if !imageQrCodeSrc}
		<FileInput
			title="select file"
			multiple
			accept="image/*"
			onDropEvent={selectFile}
		>
			<div style="display: flex; flex-direction: column; align-items: center;">
				{#if imageSrcPreview}
					<img
						alt="preview"
						style="height: 50px; width: 50px;"
						src={imageSrcPreview}
					/>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 -960 960 960"
						style="
					display: inline-block; 
					vertical-align: middle; 
					fill: currentColor;
					height: 50px;
					width: 50px;
					"
					>
						<path
							d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z"
						/>
					</svg>
				{/if}
				<p>Drag and drop</p>
				<p>or</p>
				<Button {isLoading} title="browse file" variant="outlined">
					Choose file
				</Button>
			</div>
		</FileInput>
	{/if}

	{#if imageQrCodeSrc}
		<div
			style="display: flex; flex-direction: column; gap: 1rem; width: 50%; margin: 0 auto;"
		>
			<Link href={imageQrCodeSrc} download={output()} style="width: auto;">
				<img
					alt="qr code"
					src={imageQrCodeSrc}
					height="150"
					width="150"
					style="margin: 0 auto;"
				/>
			</Link>
			<Button title="download" onclick={download}>Download</Button>
			<Button title="reset" variant="outlined" onclick={reset}>Reset</Button>
		</div>
	{:else}
		<Button title="generate qr code" {isLoading} onclick={generate}>
			Generate
		</Button>
	{/if}
</div>

<style>
	.container {
		width: 500px;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	@media screen and (max-width: 768px) {
		.container {
			width: 100%;
		}
	}
</style>
