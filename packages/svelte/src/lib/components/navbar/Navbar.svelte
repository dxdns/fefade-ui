<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements"
	import {
		classMapUtil,
		fadeOnScrollAction,
		type VariantType
	} from "@fefade-ui/core"
	import styles from "@fefade-ui/core/styles/Navbar.module.css"

	interface Props extends HTMLAttributes<HTMLElement> {
		isTranslucent?: boolean
		fadeOnScroll?: boolean
		variant?: VariantType
	}

	let {
		class: className = "",
		isTranslucent = false,
		fadeOnScroll = false,
		variant = "contained",
		children,
		...rest
	}: Props = $props()
</script>

<nav
	{...rest}
	data-fade-on-scroll={fadeOnScroll}
	class={classMapUtil(
		className,
		[className, styles],
		[variant, styles],
		styles.navbar,
		{
			[styles.isTranslucent]: isTranslucent
		}
	)}
	use:fadeOnScrollAction
>
	{@render children?.()}
</nav>
