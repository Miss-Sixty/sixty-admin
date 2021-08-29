import Layout from '@/layout'

export default {
  path: '/icons',
  component: Layout,
  redirect: '/icons/index',
  children: [
    {
      path: 'index',
      name: 'Icons',
      component: () => import('@/views/icons'),
      meta: {
        title: 'Icon 图标',
        icon: 'icon',
      },
    },
  ],
}
