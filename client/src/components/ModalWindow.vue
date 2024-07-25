<script setup>
const props = defineProps({
	isActive: {
		type: Boolean,
		default: false
	}
})

</script>

<template>
  <div
    class="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center"
    :class="{ 'hidden': !props.isActive }"
  >
		<slot></slot>
  </div>
</template>