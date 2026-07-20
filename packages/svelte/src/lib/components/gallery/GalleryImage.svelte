<script lang="ts">
	import {
		classMapUtil,
		handleClickUtil,
		styleToStringUtil
	} from "@fefade-ui/core"
	import type {
		CSSKebabType,
		GalleryItemType,
		HTMLAttrAnchor,
		ImageType
	} from "@fefade-ui/core"
	import styles from "@fefade-ui/core/styles/GalleryItem.module.css"
	import type { HTMLImgAttributes } from "svelte/elements"
	import { Image } from "$lib/components/image/index.js"
	import { createPortalAction } from "@fefade-ui/core"
	import Modal from "$lib/components/modal/index.js"

	type HTMLImageAttr = Omit<HTMLImgAttributes, "src">

	interface Props
		extends
			HTMLImageAttr,
			GalleryItemType<CSSKebabType, HTMLImageAttr>,
			HTMLAttrAnchor,
			ImageType {}

	let {
		class: className = "",
		lazy = false,
		dataSrc,
		href,
		target = "_self",
		download,
		viewer,
		captionStyle,
		children,
		...rest
	}: Props = $props()

	let openModal = $state(false)
	let selectedEl: HTMLImageElement | undefined = $state()

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

	function handleImageClick(
		e: MouseEvent & { currentTarget: EventTarget & HTMLImageElement }
	) {
		if (viewer) {
			selectedEl = e.currentTarget
			openModal = true
		}

		handleClick(e)
	}
</script>

{#if viewer && openModal && selectedEl}
	<div use:createPortalAction>
		<Modal
			isOpen={openModal}
			style="border: none;"
			handleClose={() => {
				openModal = false
				selectedEl = undefined
			}}
		>
			<Modal.Content
				style="
				text-align: center; 
				overflow: hidden; 
				padding: 0;
				"
			>
				<img
					{...rest}
					{...viewer}
					src={selectedEl.dataset.dataSrc ?? selectedEl.src}
				/>
			</Modal.Content>
		</Modal>
	</div>
{/if}

<figure
	class={classMapUtil(className, [className, styles], styles.galleryItem, {
		["clickable"]: rest.onclick || viewer || href
	})}
>
	<Image
		{...rest}
		class={styles.thumbnail}
		{lazy}
		{dataSrc}
		onclick={handleImageClick}
	/>

	<figcaption class={styles.caption} style={styleToStringUtil(captionStyle)}>
		{@render children?.()}
	</figcaption>
</figure>
