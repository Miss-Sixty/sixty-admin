import Layout from '@/layout'

export default {
  path: '/watermark',
  component: Layout,
  redirect: '/watermark/index',
  children: [
    {
      path: 'index',
      name: 'Watermark',
      component: () => import('@/views/watermark'),
      meta: {
        title: '页面水印',
        icon: 'WatermarkIcon',
      },
    },
  ],
}
