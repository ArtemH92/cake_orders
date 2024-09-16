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
      meta: { layout: 'not-auth-layout'}
    },
    {
      path: '/orders',
      meta: { layout: 'auth-layout'},
      children: [
        {
          path: 'list',
          name: 'orders-list',
          component: () => import('../views/Orders/List/OrdersList.vue'),
        },
        {
          path: 'add',
          name: 'order-add',
          component: () => import('../views/Orders/Add/CreateOrder.vue'),
        },
        {
          path: 'edit/:id',
          name: 'order-edit',
          component: () => import('../views/Orders/Edit/EditOrder.vue'),
        },
      ]
    },
    {
      path: '/users',
      meta: { layout: 'auth-layout' },
      children: [
        {
          path: 'list',
          name: 'users-list',
          component: () => import('../views/Users/List/ListUsers.vue'),
        },
        {
          path: 'add',
          name: 'user-add',
          component: () => import('../views/Users/Add/CreateUser.vue'),
        },
        {
          path: 'edit/:id',
          name: 'user-edit',
          component: () => import('../views/Users/Edit/EditUser.vue'),
        },
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (!token && to.name !== 'login') {
    // Redirect to login if no token and not going to login page
    next({ name: 'login' });
  } else if (token && to.name === 'login') {
    // Redirect to home if token exists and going to login page
    next({ path: '/' });
  } else {
    // Proceed to the intended route
    next();
  }
});

export default router
