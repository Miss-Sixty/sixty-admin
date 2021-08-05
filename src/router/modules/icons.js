import Layout from '@/layout'

export default {
  path: '/icons',
  component: Layout,
  redirect: '/icons/page',
  meta: {
    title: 'Icon 图标',
    icon: 'icon',
  },
  children: [
    {
      path: '/icons/page',
      name: 'Icons',
      component: () => import('@/views/icons'),
      meta: {
        hidden: true,
        activeMenu: '/icons',
      },
    },
  ],
}
