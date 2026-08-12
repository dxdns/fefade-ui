<script lang="ts">
	import { type Snippet } from "svelte"
	import "@fefade-ui/core/styles/StyleUtil.css"

	interface Props {
		children?: Snippet<[]>
	}

	let { children }: Props = $props()
</script>

{@render children?.()}
