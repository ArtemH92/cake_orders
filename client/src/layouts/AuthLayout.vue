<script setup lang="ts">
import NavHeader from "../components/NavHeader.vue"

</script>

<template>
  <a-layout class="min-h-screen bg-fuchsia-500">
    <NavHeader />
    <a-layout-content class="pt-16 p-4">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>