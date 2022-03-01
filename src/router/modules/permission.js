import Layout from '@/layout/index.vue'
import { HomeFilled } from '@element-plus/icons-vue'

export default {
  path: '/permission',
  component: Layout,
  redirect: '/permission/index',
  children: [
    {
      path: 'index',
      name: 'Permission',
      component: () => import('@/views/permission/index.vue'),
      meta: {
        title: '权限验证',
        icon:HomeFilled,
      },
    },
  ],
}
