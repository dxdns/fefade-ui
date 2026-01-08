<script setup lang="ts">
	import { computed, useAttrs, IntrinsicElementAttributes } from "vue"
	import { classMapUtil } from "@fefade-ui/core/utils"
	import type { SpinnerType } from "@fefade-ui/core/types"
	import styles from "@fefade-ui/core/styles/Spinner.module.css"

	interface Props extends SpinnerType {}

	const { size } = defineProps<Props>()
	const attrs = useAttrs() as IntrinsicElementAttributes["span"]

	const computedClass = computed(() => {
		return classMapUtil(
			attrs.class,
			[attrs.class, styles],
			[size, styles],
			styles.spinner
		)
	})
</script>

<template>
	<span v-bind="attrs" :class="computedClass" />
</template>
