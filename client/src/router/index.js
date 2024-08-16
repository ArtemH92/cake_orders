import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/LoginPage.vue')
    },
    {
      path: '/orders',
      children: [
        {
          path: 'list',
          name: 'list',
          component: () => import('../views/Orders/List/OrdersList.vue'),
        },
        {
          path: 'add',
          name: 'add',
          component: () => import('../views/Orders/Add/CreateOrder.vue'),
        },
        {
          path: 'edit/:id',
          name: 'edit',
          component: () => import('../views/Orders/Edit/EditOrder.vue'),
        },
      ]
    },
  ]
})

export default router
