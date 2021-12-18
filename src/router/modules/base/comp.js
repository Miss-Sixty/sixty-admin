import Layout from '@/layout/index.vue'

export default {
  path: '/comp',
  component: Layout,
  name: 'Comp',
  redirect: '/comp/page-header',
  meta: {
    title: '组件',
    icon: 'CollageFill-icon'
  },
  children: [
    {
      path: 'page-header',
      name: 'PageHeader',
      component: () => import('@/views/base/comp/pageheader/index.vue'),
      meta: {
        title: '页头'
      }
    },
    {
      path: 'page-main',
      name: 'PageMain',
      component: () => import('@/views/base/comp/pageMain/index.vue'),
      meta: {
        title: '内容块'
      }
    },
    {
      path: 'upload',
      name: 'Upload',
      component: () => import('@/views/base/comp/upload/index.vue'),
      meta: {
        title: '上传'
      }
    },
    {
      path: 'trend',
      name: 'Trend',
      component: () => import('@/views/base/comp/trend/index.vue'),
      meta: {
        title: '趋势符号'
      }
    }
  ]
}
