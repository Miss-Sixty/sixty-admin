import Layout from '@/layout/index.vue'
import { HomeFilled } from '@element-plus/icons-vue'

export default {
  path: '/watermark',
  component: Layout,
  redirect: '/watermark/index',
  children: [
    {
      path: 'index',
      name: 'Watermark',
      component: () => import('@/views/watermark/index.vue'),
      meta: {
        title: '页面水印',
        icon: HomeFilled,
      },
    },
  ],
}
