<script lang="ts">
	import { Button, Drawer } from "@fefade-ui/svelte"
	import { onMount } from "svelte"

	let isOpen = $state(false)

	function handleOpen() {
		isOpen = !isOpen
	}

	function handleClose() {
		isOpen = false
	}

	onMount(() => {
		isOpen = true
	})
</script>

<Button onclick={handleOpen}>Open</Button>

<Drawer
	{isOpen}
	position="bottom"
	style="
	padding: 0; 
	display: flex; 
	flex-direction: column; 
	align-items: center;
	"
>
	<Drawer.Header>
		<strong>🍪 We use cookies</strong>
	</Drawer.Header>
	<Drawer.Content style="max-width: 500px; gap: 0.5rem;">
		<p>
			We use cookies to enhance your experience. By continuing to visit this
			site you agree to our use of cookies.
		</p>
		<Button variant="outlined" onclick={handleClose}>Decline</Button>
		<Button>Accept</Button>
	</Drawer.Content>
</Drawer>
