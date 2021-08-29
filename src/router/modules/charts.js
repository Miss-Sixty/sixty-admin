import Layout from '@/layout'

export default {
  path: '/charts',
  component: Layout,
  redirect: '/charts/index',
  children: [
    {
      path: 'index',
      name: 'Charts',
      component: () => import('@/views/charts'),
      meta: {
        title: '图表',
        icon: 'PieChart2Fill',
      },
    },
  ],
}
