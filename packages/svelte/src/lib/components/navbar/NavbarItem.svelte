<script lang="ts">
	import {
		classMapUtil,
		type CSSKebabType,
		type LinkType
	} from "@fefade-ui/core"
	import type { HTMLAnchorAttributes } from "svelte/elements"
	import Link from "$lib/components/link/index.js"
	import styles from "@fefade-ui/core/styles/NavbarItem.module.css"

	interface Props
		extends
			Omit<Omit<HTMLAnchorAttributes, "class">, "style">,
			LinkType<CSSKebabType | string> {}

	let { children, ...rest }: Props = $props()
</script>

<Link {...rest} class={classMapUtil(rest.className, styles.navbarItem)}>
	{@render children?.()}
</Link>
