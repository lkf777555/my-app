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
        path: '/videowz',
        name: 'videowz',
        component: () => import('../view/videowz.vue'),
        meta: {
          title: '精彩剪辑',
        },
      },
      {
        path: '/myinfo',
        name: 'myinfo',
        component: () => import('../view/myinfo.vue'),
        meta: {
          title: '我的数据',
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
