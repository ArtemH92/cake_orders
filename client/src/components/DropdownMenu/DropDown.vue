<script setup>
import { ref } from 'vue';
import Menu from 'primevue/menu';
import Button from 'primevue/button';
import { DropdownItems } from './config';

const props = defineProps({
  user: Object
})
const { items } = DropdownItems(props.user)
const menu = ref();

const toggle = (event) => {
    menu.value.toggle(event);
};
</script>

<template>
  <div class="flex items-center">
    <span class="text-white pr-2">{{ user.username }}</span>
    <Button severity="help" type="button" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" size="small">
      <span class="material-icons-outlined">
        account_circle
      </span>
    </Button>
    <Menu ref="menu" id="overlay_menu" :popup="true" :model="items"></Menu>
  </div>
</template>