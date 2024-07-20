<script setup lang="ts">
import NavHeader from "../components/NavHeader.vue"
import { useAuthStore } from "@/stores/auth";

const {user, currentUser} = useAuthStore()

currentUser()

</script>

<template>
  <a-layout class="min-h-screen bg-emerald-800">
    <NavHeader :username="user?.username" />
    <a-layout-content class="pt-16 p-4">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>


<style scoped></style>