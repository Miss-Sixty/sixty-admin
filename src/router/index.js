import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import { Box } from '@element-plus/icons-vue'
import { shallowRef } from 'vue'

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
        path: '/home',
        name: 'home',
        meta: { title: '首页' },
        component: () => import('@/views/home.vue'),
      },
      {
        path: '/reload',
        name: 'reload',
        meta: { title: '刷新' },
        component: () => import('@/views/reload.vue'),
      },
    ],
  },
]

// demo
import multilevel_menu from './modules/demo/multilevel_menu'
import breadcrumb from './modules/demo/breadcrumb'
import keep_alive_page from './modules/demo/keep_alive_page'
import component_extend from './modules/demo/component_extend'
import badge from './modules/demo/badge'

// page
import table from './modules/page/table'
// 动态路由（异步路由、导航栏路由）
export const asyncRoutes = [
  {
    meta: {
      title: '演示',
      icon: shallowRef(Box),
    },
    children: [multilevel_menu, breadcrumb, keep_alive_page, component_extend, badge],
  },
  {
    meta: {
      title: '页面',
      icon: shallowRef(Box),
    },
    children: [table],
  },
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
