<script setup lang="ts">
interface Props {
  title: string
  btnText: string
  path: string
}

const props = defineProps<Props>()
</script>

<template>
  <a-space class="max-w-4xl mx-auto w-full flex justify-between" align="center">
    <a-typography-title :level="2" class="!text-white !mt-1 flex-grow">
      {{ props.title }}
    </a-typography-title>
    <a-button type="link" :href="props.path" class="text-white">
      {{ props.btnText }}
    </a-button>
  </a-space>
</template>

