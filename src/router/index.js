import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'

/** 
  meta : {
    hidden: true                如果设置为 true，项目将不会显示在侧边栏中（默认为 false）
    auth: ['admin','editor']    该路由进入的权限，支持多个权限叠加，只要满足一个，即可进入
                                如果用户没有该权限，则该路由不会在侧边栏导航中展示
    title:  'title'             该路由在侧边栏导航和面包屑导航中展示的标题
    icon: 'icon-x'              侧边栏导航中显示的图标（只支持svg图标）
    activeMenu: '/news/list',   当路由设置了该属性，则会高亮相对应的侧边栏，一般会搭配 hidden: true 一起使用
    breadcrumb: true            该路由是否在面包屑导航中展示，默认为 true
    link: '',                   内嵌网页链接，如果要开启内嵌网页，component 需要设置为框架提供的 layoue/iframe.vue
    copyright: false            该路由是否显示底部版权信息，比全局设置里的 showCopyright 优先级高，不设置则继承全局里的设置
    
    TODO
    // noCache: true                如果设置为true，页面将不会被缓存（默认为false）
  }
 */

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home'),
        name: 'Home',
        meta: { title: '首页', icon: 'el-icon-s-home' },
      },
      {
        path: '/reload',
        name: 'Reload',
        component: () => import('@/views/reload'),
      },
    ],
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
  },
]

//基础
import Nested from './modules/nested'
import Link from './modules/link' //外链
import Icons from './modules/icons' //图标
import Permission from './modules/permission' //权限
import Components from './modules/components' //拓展组件
import Watermark from './modules/watermark' //页面水印

//页面
import table from './modules/table'
import User from './modules/user' //个人设置

export const asyncRoutes = [
  {
    meta: {
      title: '基础',
      icon: 'home',
    },
    children: [Components, Icons, Permission, Nested, Watermark, Link],
  },
  {
    meta: {
      title: '页面',
      icon: 'page',
    },
    children: [User, table],
  },
]

export const lastRoutes = [
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404'),
    meta: {
      title: '404',
      sidebar: false,
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: constantRoutes,
})

export default router
