import Layout from '@/layout/index.vue'
import { HomeFilled } from '@element-plus/icons-vue'

export default {
  path: '/charts',
  component: Layout,
  redirect: '/charts/index',
  children: [
    {
      path: 'index',
      name: 'Charts',
      component: () => import('@/views/charts/index.vue'),
      meta: {
        title: '图表',
        icon: HomeFilled,
      },
    },
  ],
}
