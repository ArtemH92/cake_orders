import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/LoginPage.vue'),
      meta: { layout: 'not-auth', auth: false }
    },
    {
      path: '/',
      name: 'home',
      redirect: '/orders/list',
      meta: { layout: 'auth', auth: true },
      children: [
        {
          path: 'orders/list',
          name: 'orders-list',
          component: () => import('../views/Orders/OrdersList.vue')
        }
      ]
    }
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
