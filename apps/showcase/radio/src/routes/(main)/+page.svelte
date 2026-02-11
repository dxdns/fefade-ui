<script lang="ts">
	import { ControlBar } from "$lib/components/control-bar"
	import { Info } from "$lib/components/info/index.js"
	import { Player } from "$lib/components/player/index.js"
	import { Stations } from "$lib/components/stations/index.js"
	import apiService from "$lib/services/apiService.js"
	import type { CountryType, StationsType } from "$lib/types/index.js"
	import { Constants } from "@fefade-ui/core"
	import {
		Link,
		Navbar,
		SearchInput,
		Select,
		Spinner,
		useMediaQuery,
		VisibilityListener
	} from "@fefade-ui/svelte"
	import { onDestroy, onMount } from "svelte"

	let { data } = $props()

	const defaultLimit = 15
	const defaultVolume = 50

	let result: StationsType[] = $state([])
	let countries: CountryType[] = $state([])
	let countryCode = $state("BR")
	let limit = $state(defaultLimit)
	let searchInputValue = $state("")
	let currentStationuuid = $state("")
	let currentUrl = $state("")
	let volume = $state(defaultVolume)
	let audio: HTMLAudioElement | null = $state(null)
	let isPlaying = $state(false)
	let currentSound: string | undefined = $state()
	let eventSource: EventSource | null = $state(null)

	const api = apiService()
	const isSm = useMediaQuery("max-width", "sm")
	const currentStationStorageKey = "currentStationuuid"
	const currentVolumeStorageKey = "volume"

	const currentStation = $derived(
		result.find((v) => v.stationuuid === currentStationuuid)
	)

	function resetAudio() {
		if (audio) {
			audio.pause()
			audio = null
		}
	}

	function resetEventSource() {
		if (eventSource) {
			eventSource.close()
			eventSource = null
		}
	}

	function playAudio() {
		if (audio) {
			audio.play()
			isPlaying = true
		}
	}

	function pauseAudio() {
		if (audio) {
			audio.pause()
			isPlaying = false
		}
	}

	function setCurrentStationStorage() {
		localStorage.setItem(currentStationStorageKey, currentStationuuid)
	}

	function setCurrentVolumeStorage(v: number) {
		localStorage.setItem(currentVolumeStorageKey, v.toString())
	}

	function getCurrentStationFromStorage() {
		return localStorage.getItem(currentStationStorageKey)
	}

	function getCurrentVolumeFromStorage() {
		return localStorage.getItem(currentVolumeStorageKey)
	}

	function playSound() {
		if (!currentStation) return

		const { url_resolved, name, stationuuid } = currentStation

		const isSameStation = url_resolved === currentUrl

		function setAudioAndPlay() {
			resetAudio()
			resetEventSource()

			audio = new Audio(url_resolved)
			currentUrl = url_resolved
			currentSound = name
			currentStationuuid = stationuuid

			playAudio()
			setCurrentStationStorage()

			eventSource = new EventSource(
				`/api/meta-data?streamUrl=${encodeURIComponent(url_resolved)}`
			)
		}

		if (!audio || !isSameStation) {
			setAudioAndPlay()
			return
		}

		if (isPlaying) {
			pauseAudio()
		} else {
			playAudio()
		}
	}

	async function fetchData() {
		const response = await api.get(limit, countryCode, searchInputValue, null)
		if (!response.ok) throw new Error("error")
		result = await response.json()
	}

	async function fetchCountries() {
		const response = await api.getCountries()
		if (!response.ok) throw new Error("error")
		countries = await response.json()
	}

	async function handleSubmit(
		event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
	) {
		event.preventDefault()
		result = []
		const formData = new FormData(event.currentTarget)
		searchInputValue = String(formData.get("searchInputValue") || "")
		await fetchData()
	}

	$effect(() => {
		fetchData()
	})

	$effect(() => {
		if (audio) {
			audio.volume = volume / 100
			setCurrentVolumeStorage(volume)
		}
	})

	$effect(() => {
		if (eventSource) {
			eventSource.onmessage = (e) => {
				if (e.data === "Unknown") {
					currentSound = currentStation?.name
				} else {
					currentSound = e.data
				}
			}

			eventSource.onerror = () => {
				currentSound = currentStation?.name ?? "Error loading metadata."
			}
		}
	})

	onMount(() => {
		fetchCountries()
		currentStationuuid = String(getCurrentStationFromStorage())
		volume = Number(getCurrentVolumeFromStorage() || defaultVolume)

		navigator.mediaSession.setActionHandler("play", () => {
			if (audio) {
				audio.play()
			}
		})

		navigator.mediaSession.setActionHandler("pause", () => {
			if (audio) {
				audio.pause()
			}
		})

		navigator.mediaSession.setActionHandler("stop", () => {
			if (audio) {
				audio.pause()
			}
		})
	})

	onDestroy(() => {
		resetAudio()
		resetEventSource()
	})
</script>

<svelte:head>
	<title>{currentSound ?? "Listen Live on Radio"} | {data.title}</title>
	<meta
		name="description"
		content="Discover live streams, top hits, and your favorite stations anytime, anywhere."
	/>
</svelte:head>

<ControlBar
	name={currentSound ?? currentStation?.name}
	image={currentStation?.favicon}
	{isPlaying}
	bind:volume
	handleClick={playSound}
/>

<Navbar
	style="
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 900;
	height: auto;
	padding: 1rem;
	flex-wrap: wrap;
	gap: 1rem;
	background: {Constants.themeColorVar.bg};
	box-shadow: 0 0 10px rgba(0,0,0,1);
	"
>
	<Link
		href="/"
		style="gap: 0.5rem;"
		onclick={() => {
			searchInputValue = ""
		}}
	>
		<img alt="logo" src="/512x512.png" height="48px" width="48px" />
		<h2>Radio</h2>
	</Link>
	<div style="flex: 1;"></div>
	<form onsubmit={handleSubmit} style="width: {isSm.value ? '100%' : 'auto'};">
		<SearchInput
			id="searchInputValue"
			name="searchInputValue"
			variant="outlined"
			placeholder="Search stations..."
			oninput={(e) => {
				if (e.currentTarget.value === "") {
					searchInputValue = ""
				}
			}}
			value={searchInputValue}
		/>
	</form>

	<div style="flex: 1;"></div>

	<label
		class="muted"
		for="country"
		style="display: flex; align-items: center; gap: 1rem;"
	>
		<small>Country:</small>
		<Select
			id="country"
			onchange={(e) => {
				const { value } = e.currentTarget
				countryCode = value
			}}
			value={countryCode}
		>
			{#each countries as { name, stationcount } (`${name}-${stationcount}`)}
				<option value={name}>{name}</option>
			{/each}
		</Select>
	</label>
</Navbar>

{#if result.length === 0}
	<div
		style="
		min-height: 100vh; 
		display: flex; 
		justify-content: center; 
		align-items: center;
		"
	>
		<Spinner size="lg" />
	</div>
{:else}
	<div class="content">
		<Player
			{isPlaying}
			bind:volume
			handleClick={() => {
				playSound()
			}}
		>
			{#snippet radioInfo()}
				<Info
					avatarProps={{
						width: "150px",
						height: "150px",
						src: currentStation?.favicon
					}}
				>
					<h2
						style="
						width: 100%;
						white-space: nowrap; 
						overflow: hidden; 
						text-overflow: ellipsis;
						text-align: center;
						"
					>
						{currentStation?.name ?? "No station selected"}
					</h2>
				</Info>
			{/snippet}

			<Stations
				bind:currentId={currentStationuuid}
				data={result}
				{isPlaying}
				handleClick={playSound}
			/>
		</Player>
	</div>
{/if}

<VisibilityListener
	callback={() => {
		limit += defaultLimit
	}}
/>

<style>
	.content {
		padding: 6rem 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	@media screen and (max-width: 425px) {
		.content {
			padding: 10rem 0;
		}
	}
</style>
