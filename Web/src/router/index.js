import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../view/home.vue'),
  },
  {
    path: '/',
    name: 'login',
    component: () => import('../view/login.vue'),
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
