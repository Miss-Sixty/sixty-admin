import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

/** 
 * hidden: true                   如果设置为 true，项目将不会显示在侧边栏中（默认为 false）
 * alwaysShow: true               如果设置为 true，将始终显示根菜单

  meta : {
    auth: ['admin','editor']    该路由进入的权限，支持多个权限叠加，只要满足一个，即可进入
                                如果用户没有该权限，则该路由不会在侧边栏导航中展示
    title:  'title'             该路由在侧边栏导航和面包屑导航中展示的标题
    icon: 'icon-x'              侧边栏导航中显示的图标（只支持svg图标）
    activeMenu: '/news/list',   当路由设置了该属性，则会高亮相对应的侧边栏，一般会搭配 hidden: true 一起使用
    breadcrumb: true            该路由是否在面包屑导航中展示，默认为 true
    link: '',                   内嵌网页链接，如果要开启内嵌网页，component 需要设置为框架提供的 layoue/iframe.vue
    
    TODO
    // noCache: true                如果设置为true，页面将不会被缓存（默认为false）
    //copyright: false            该路由是否显示底部版权信息，比全局设置里的 showCopyright 优先级高，不设置则继承全局里的设置
  }
 */

const baseRoutes = {
  path: '/',
  component: Layout,
  redirect: '/home',
  children: [
    {
      path: '/home',
      component: () => import('@/views/home.vue'),
      name: 'Home',
      meta: { title: '首页', icon: 'Home-icon', copyright: false, affix: true },
    },
    {
      path: '/reload',
      name: 'Reload',
      meta: {
        title: '刷新',
        hidden: true,
      },
      component: () => import('@/views/reload.vue'),
    },
  ],
}

export const constantRoutes = [
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
import Table from './modules/table' //表单页
import Settings from './modules/settings' //个人设置
import Exception from './modules/exception' //异常页
import Notice from './modules/notice' //异常页

export const asyncRoutes = [
  {
    meta: {
      title: '基础',
      icon: 'home-icon',
    },
    children: [baseRoutes, Icons, comp, Feat, Watermark, Badge, Charts, Permission, Print, Frame, OnlinePreview, Nested],
  },
  {
    meta: {
      title: '页面',
      icon: 'page-icon',
    },
    children: [Table, Exception, Settings,Notice],
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
