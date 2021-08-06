import Layout from '@/layout'

export default {
  path: '/watermark',
  component: Layout,
  redirect: '/watermark/page',
  meta: {
    title: '页面水印',
    icon: 'WatermarkIcon',
  },
  children: [
    {
      path: 'page',
      name: 'Watermark',
      component: () => import('@/views/watermark'),
      meta: {
        hidden: true,
        activeMenu: '/watermark',
      },
    },
  ],
}
