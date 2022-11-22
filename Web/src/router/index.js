import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../view/login.vue'),
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('../layout/index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../view/home.vue'),
        meta: {
          title: '主页',
        },
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('../view/users.vue'),
        meta: {
          title: '用户列表',
        },
      },
      {
        path: '/shops',
        name: 'shops',
        component: () => import('../view/shops.vue'),
        meta: {
          title: '商品列表',
        },
      },
    ],
  },
  {
    path: '/myAside',
    name: 'myAside',
    component: () => import('../layout/myAside.vue'),
  },
  {
    path: '/myHeader',
    name: 'myHeader',
    component: () => import('../layout/myHeader.vue'),
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
