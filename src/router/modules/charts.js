import Layout from '@/layout'

export default {
  path: '/charts',
  component: Layout,
  redirect: '/charts/page',
  meta: {
    title: '图表',
    icon: 'file-excel-2-line',
  },
  children: [
    {
      path: '/charts/page',
      name: 'Charts',
      component: () => import('@/views/charts'),
      meta: {
        hidden: true,
        activeMenu: '/charts',
      },
    },
  ],
}
