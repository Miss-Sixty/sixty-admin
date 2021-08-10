import Layout from '@/layout'

export default {
  path: '/print',
  component: Layout,
  redirect: '/print/page',
  meta: {
    title: '打印',
    icon: 'PieChart2Fill',
  },
  children: [
    {
      path: '/print/page',
      name: 'Print',
      component: () => import('@/views/print'),
      meta: {
        hidden: true,
        activeMenu: '/print',
      },
    },
  ],
}
