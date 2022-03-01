import Layout from '@/layout/index.vue'
import { HomeFilled } from '@element-plus/icons-vue'

export default {
  path: '/comp',
  component: Layout,
  name: 'Comp',
  redirect: '/comp/page-header',
  meta: {
    title: '组件',
    icon: HomeFilled,
  },
  children: [
    {
      path: 'page-header',
      name: 'PageHeader',
      component: () => import('@/views/comp/pageheader/index.vue'),
      meta: {
        title: '页头',
      },
    },
    {
      path: 'page-main',
      name: 'PageMain',
      component: () => import('@/views/comp/pageMain/index.vue'),
      meta: {
        title: '内容块',
      },
    },
    {
      path: 'upload',
      name: 'Upload',
      component: () => import('@/views/comp/upload/index.vue'),
      meta: {
        title: '上传',
      },
    },
    {
      path: 'trend',
      name: 'Trend',
      component: () => import('@/views/comp/trend/index.vue'),
      meta: {
        title: '趋势符号',
      },
    },
  ],
}
