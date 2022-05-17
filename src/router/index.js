import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import { Box } from '@element-plus/icons-vue'
import { markRaw } from 'vue'

// 固定路由
const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/reload',
        name: 'reload',
        meta: {
          title: '刷新',
          hidden: true,
        },
        component: () => import('@/views/reload.vue'),
      },
    ],
  },
]

import Demo from './demo.js'
// 动态路由（异步路由、导航栏路由）
export const asyncRoutes = [
  {
    meta: {
      title: '基础',
      icon: markRaw(Box),
    },
    children: [
      {
        path: '/',
        component: Layout,
        redirect: '/home',
        meta: { title: '首页', icon: markRaw(Box) },
        children: [
          {
            path: '/home',
            component: () => import('@/views/home.vue'),
            name: 'home',
            meta: { title: '首页', icon: markRaw(Box), sidebar: false },
          },
        ],
      },
    ],
  },
  // {
  //   meta: {
  //     title: '演示',
  //     icon: markRaw(Box),
  //   },
  //   children: [Demo],
  // },
]

export const lastRoutes = {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  component: () => import('@/views/404.vue'),
  meta: {
    title: '找不到页面',
  },
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})

export default router
