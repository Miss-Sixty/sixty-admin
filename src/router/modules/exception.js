import Layout from '@/layout/index.vue'
import { HomeFilled } from '@element-plus/icons-vue'

export default {
  path: '/exception',
  component: Layout,
  redirect: '/exception/403',
  meta: {
    title: '异常页',
    icon: HomeFilled,
  },
  children: [
    {
      path: '403',
      name: 'PageNotAccess',
      component: () => import('@/views/exception/403.vue'),
      meta: {
        title: '403',
      },
    },
    {
      path: '404',
      name: 'PageNotFound',
      component: () => import('@/views/exception/404.vue'),
      meta: {
        title: '404',
      },
    },
    {
      path: '500',
      name: 'ServiceError',
      component: () => import('@/views/exception/500.vue'),
      meta: {
        title: '500',
      },
    },
    {
      path: 'net-work-error',
      name: 'NetWorkError',
      component: () => import('@/views/exception/netWorkError.vue'),
      meta: {
        title: '网络错误',
      },
    },
  ],
}
