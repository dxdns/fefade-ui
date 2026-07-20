<script lang="ts">
	import { classMapUtil } from "@fefade-ui/core"
	import type { HTMLTextareaAttributes } from "svelte/elements"
	import styles from "@fefade-ui/core/styles/Textarea.module.css"

	interface Props extends HTMLTextareaAttributes {}

	let { class: className = "", ...rest }: Props = $props()
</script>

<textarea {...rest} class={classMapUtil(className, styles.textarea)}>
</textarea>
