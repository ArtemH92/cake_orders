import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/orders/list',
      children: [
        {
          path: 'orders/list',
          name: 'orders-list',
          component: () => import('../views/Orders/OrdersList.vue')
        }
      ]
    },
  ]
})

export default router
