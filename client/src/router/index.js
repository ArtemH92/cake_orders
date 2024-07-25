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
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (!localStorage.getItem('token')) {
//     next('/login')
//   } else if (localStorage.getItem('token')) {
//     next('/')
//   } else {
//     next()
//   }
// })

export default router
