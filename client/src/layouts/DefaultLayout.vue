<script setup lang="ts">
import { ref, computed } from "vue";
import NavHeader from "../components/NavHeader.vue"
import { useAuthStore } from "@/stores/auth";

const { currentUser, user } = useAuthStore()
let loader = ref(false)

const fetchUser = () => {
  loader.value = true
  currentUser().then(() => {
    loader.value = false
  }).finally(() => loader.value = false)
}
const userInfo = computed(() => user)

fetchUser()

</script>

<template>
  <a-layout class="min-h-screen bg-emerald-800">
    <NavHeader v-if="!loader" :username="userInfo?.value?.username"/>
    <a-layout-content class="pt-16 p-4" v-if="!loader">
      <router-view />
    </a-layout-content>
    <a-layout-content class="pt-16 p-4" v-if="loader">
      loader
    </a-layout-content>
  </a-layout>
</template>


<style scoped></style>