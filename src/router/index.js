import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import { HomeFilled } from '@element-plus/icons-vue'
import { markRaw } from 'vue'
export const constantRoutes = [
  {
    path: '/',
    redirect: '/home',
    children: [
      {
        path: '/reload',
        name: 'Reload',
        component: () => import('@/views/reload.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
  },
]

//基础
import Nested from './modules/nested'
import Frame from './modules/frame'
import Badge from './modules/badge' //动态标记
import Feat from './modules/feat' //方法
import comp from './modules/comp' //组件
import Icons from './modules/icons' //图标
import Watermark from './modules/watermark' //页面水印
import OnlinePreview from './modules/onlinePreview' //office 预览
import Charts from './modules/charts' // 图表
import Print from './modules/print' // 打印
import Permission from './modules/permission' //权限

//页面
import Notice from './modules/page/notice' //通知公告
import Table from './modules/table' //表单页
import Settings from './modules/settings' //个人设置
import Exception from './modules/exception' //异常页
import Organization from './modules/page/organization' //通用列表页

// 动态路由（异步路由、导航栏路由）
export const asyncRoutes = [
  {
    meta: {
      title: '基础',
      icon: markRaw(HomeFilled),
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
            meta: { title: '首页', icon: HomeFilled, copyright: false, affix: true },
          },
        ],
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
      Nested,
    ],
  },
  {
    meta: {
      title: '页面',
      icon: HomeFilled,
    },
    children: [Notice, Organization, Table, Exception, Settings],
  },
]

export const lastRoutes = {
  path: '/',
  component: Layout,
  redirect: '/home',
  children: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/exception/404.vue'),
      hidden: true,
    },
  ],
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})

export default router
