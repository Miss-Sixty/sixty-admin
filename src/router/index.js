import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/reload',
        name: 'Reload',
        component: () => import('@/views/reload.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  }
]

// 基础
import Nested from './modules/base/nested'
import Frame from './modules/base/frame'
import Badge from './modules/base/badge' // 动态标记
import Feat from './modules/base/feat' // 方法
import comp from './modules/base/comp' // 组件
import Icons from './modules/base/icons' // 图标
import Watermark from './modules/base/watermark' // 页面水印
import OnlinePreview from './modules/base/onlinePreview' // office 预览
import Charts from './modules/base/charts' // 图表
import Print from './modules/base/print' // 打印
import Permission from './modules/base/permission' // 权限

// 页面
import Notice from './modules/page/notice' // 通知公告
import Settings from './modules/page/settings' // 个人设置
import Exception from './modules/page/exception' // 异常页
import Example from './modules/page/example' // 通用列表页

// 动态路由（异步路由、导航栏路由）
export const asyncRoutes = [
  {
    meta: {
      title: '基础',
      icon: 'home-icon'
    },
    children: [
      {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
          {
            path: '/home',
            component: () => import('@/views/home.vue'),
            name: 'Home',
            meta: { title: '首页', icon: 'Home-icon', copyright: false, affix: true }
          }
        ]
      },
      Icons,
      comp,
      Feat,
      Watermark,
      Badge,
      Charts,
      Permission,
      Print,
      Frame,
      OnlinePreview,
      Nested
    ]
  },
  {
    meta: {
      title: '页面',
      icon: 'page-icon'
    },
    children: [Notice, Example, Exception, Settings]
  }
]

export const lastRoutes = {
  path: '/',
  component: Layout,
  redirect: '/home',
  children: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/page/exception/404.vue'),
      hidden: true
    }
  ]
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
