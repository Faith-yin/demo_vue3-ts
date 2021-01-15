/*
 * @Date: 2021-01-10 11:25:42
 * @information: router
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },

  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
