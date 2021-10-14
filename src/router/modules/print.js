import Layout from '@/layout/index.vue'

export default {
  path: '/print',
  component: Layout,
  redirect: '/print/index',
  children: [
    {
      path: 'index',
      name: 'Print',
      component: () => import('@/views/print/index.vue'),
      meta: {
        title: '打印',
        icon: 'PrinterFill',
      },
    },
  ],
}
