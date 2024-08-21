import { ref } from "vue";

export const ModalState = ref(false)
export const ModalValue = ref('')

export const hendlerModal = (state, value) => {
  ModalState.value = state
  ModalValue.value = value
}