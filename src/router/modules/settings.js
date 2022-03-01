import Layout from '@/layout/index.vue'
import { HomeFilled } from '@element-plus/icons-vue'

export default {
  path: '/settings',
  component: Layout,
  redirect: '/settings/index',
  children: [
    {
      path: 'index',
      name: 'Settings',
      component: () => import('@/views/settings/index.vue'),
      meta: {
        title: '系统设置',
        icon: HomeFilled,
      },
    },
  ],
}
