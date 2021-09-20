import Layout from '@/layout'

export default {
  path: '/comp',
  component: Layout,
  name: 'Comp',
  redirect: '/comp/page-header',
  meta: {
    title: '组件',
    icon: 'CollageFill',
  },
  children: [
    {
      path: 'page-header',
      name: 'PageHeader',
      component: () => import('@/views/comp/pageheader'),
      meta: {
        title: '页头',
      },
    },
    {
      path: 'page-main',
      name: 'PageMain',
      component: () => import('@/views/comp/pageMain'),
      meta: {
        title: '内容块',
      },
    },
    {
      path: 'upload',
      name: 'Upload',
      component: () => import('@/views/comp/upload'),
      meta: {
        title: '上传',
      },
    },
  ],
}
