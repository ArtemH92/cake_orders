import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginRegister/LoginView.vue'),
      meta: { layout: 'not-auth', auth: false }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/LoginRegister/RegisterView.vue'),
      meta: { layout: 'not-auth', auth: false }
    },
    {
      path: '/',
      name: 'home',
      redirect: '/home',
      meta: { layout: 'default', auth: true },
      children: [
        {
          path: 'home',
          name: 'homepage',
          component: () => import('../views/Home/HomeView.vue')
        },
        {
          path: 'orders',
          name: 'orders',
          redirect: 'orders/list',
          children: [
            {
              path: 'list',
              name: 'orders_list',
              component: () => import('../views/Orders/All/AllOrders.vue'),
            },
            {
              path: 'add',
              name: 'orders_add',
              component: () => import('../views/Orders/Add/AddOrder.vue')
            },
            {
              path: 'edit/:id',
              name: 'orders_edit',
              component: () => import('../views/Orders/Edit/EditOrder.vue')
            },
          ]
        },

      ]
    },
  ]
})

export default router
