<script lang="ts">
	import type { AvatarType } from "@fefade-ui/core/types"
	import { Avatar, Card } from "@fefade-ui/svelte"
	import type { HTMLAttributes, HTMLImgAttributes } from "svelte/elements"

	interface Props extends HTMLAttributes<HTMLDivElement> {
		name?: string
		avatarProps?: Omit<HTMLImgAttributes, "width" | "height"> & AvatarType
	}

	let { name, avatarProps, children, ...rest }: Props = $props()
</script>

<div {...rest} class="radioInfo">
	<Card
		class="rounded-full"
		style="padding: 0; overflow: visible; border: 4px solid #00FFFF;"
	>
		<Avatar {...avatarProps} textFallback={name ?? "?"} />
	</Card>
	{@render children?.()}
</div>

<style>
	.radioInfo {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		justify-content: center;
	}
</style>
