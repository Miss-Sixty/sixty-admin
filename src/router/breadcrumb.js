const Layout = () => import('@/layout/index.vue')
import { Box } from '@element-plus/icons-vue'
import { shallowRef } from 'vue'
export default {
  path: '/breadcrumb',
  component: Layout,
  redirect: '/breadcrumb/index',
  name: 'breadcrumbExample',
  meta: {
    title: '面包屑导航',
    icon: shallowRef(Box),
  },
  children: [
    {
      path: 'index',
      name: 'breadcrumbExampleIndex',
      component: () => import('@/views/breadcrumb/index.vue'),
      meta: {
        sidebar: false,
        activeMenu: '/breadcrumb',
      },
      children: [
        {
          path: 'detail2',
          name: 'breadcrumbExampleDetail2',
          component: () => import('@/views/breadcrumb/detail2.vue'),
          meta: {
            title: '详情2',
            sidebar: false,
            activeMenu: '/breadcrumb',
          },
        },
      ],
    },
    {
      path: 'detail1',
      name: 'breadcrumbExampleDetail1',
      component: () => import('@/views/breadcrumb/detail1.vue'),
      meta: {
        title: '详情1',
        sidebar: false,
        activeMenu: '/breadcrumb',
      },
    },
  ],
}
