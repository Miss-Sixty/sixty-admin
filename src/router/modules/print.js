import Layout from '@/layout'

export default {
  path: '/print',
  component: Layout,
  redirect: '/print/index',
  children: [
    {
      path: 'index',
      name: 'Print',
      component: () => import('@/views/print'),
      meta: {
        title: '打印',
        icon: 'PrinterFill',
      },
    },
  ],
}
