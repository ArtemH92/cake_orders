import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'orders/list'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/LoginPage.vue'),
      meta: { layout: 'not-auth', auth: false }
    },
    {
      path: '/orders',
      meta: { layout: 'auth', auth: true },
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

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !localStorage.getItem('token')) {
    next('/login')
  } else if (!to.meta.auth && localStorage.getItem('token')) {
    next('/')
  } else {
    next()
  }
})

export default router
