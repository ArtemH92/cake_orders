import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";

export const DropdownItems = (user) => {
  const { logout } = useAuthStore()
  const items = computed(() => ([
    ...(user.administrator ? [
      {
        label: 'Список пользователей'
      },
      {
        label: 'Добавить нового пользователя'
      }
    ] : []),
    {
      label: 'Редактировать пользователя'
    },
    {
      label: 'Выйти',
      command: () => logout()
    },
  ]));

  return { items };
}