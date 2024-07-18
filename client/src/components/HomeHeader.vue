<script setup lang="ts">
import { useRouter } from 'vue-router';

interface Props {
  title: string
  btnText: string
  path: string
}

const props = defineProps<Props>()

const router = useRouter()
</script>

<template>
  <a-space class="max-w-4xl mx-auto w-full flex justify-between" align="center">
    <a-typography-title :level="2" class="!text-white !mt-1 flex-grow">
      {{ props.title }}
    </a-typography-title>
    <a-button type="primary" class="text-white" @click="router.push(props.path)">
      {{ props.btnText }}
    </a-button>
  </a-space>
</template>

