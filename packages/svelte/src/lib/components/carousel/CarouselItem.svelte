<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements"
	import styles from "./CarouselItem.module.css"
	import {
		classMapUtil,
		handleClickUtil,
		type HTMLAttrAnchor
	} from "@fefade-ui/core"

	interface Props
		extends Omit<HTMLAttributes<HTMLDivElement>, "color">, HTMLAttrAnchor {}

	let {
		class: className = "",
		href,
		target = "_self",
		download,
		children,
		...rest
	}: Props = $props()

	function handleClick(e: any) {
		handleClickUtil({
			href,
			download,
			target,
			onClick: () => {
				rest.onclick?.(e)
			}
		})
	}
</script>

<div
	{...rest}
	class={classMapUtil(className, [className, styles], styles.carouselItem)}
	onclick={handleClick}
>
	{@render children?.()}
</div>
