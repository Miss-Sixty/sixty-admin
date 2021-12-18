import Layout from '@/layout/index.vue'

export default {
  path: '/charts',
  component: Layout,
  redirect: '/charts/index',
  children: [
    {
      path: 'index',
      name: 'Charts',
      component: () => import('@/views/base/charts/index.vue'),
      meta: {
        title: '图表',
        icon: 'PieChart2Fill-icon'
      }
    }
  ]
}
