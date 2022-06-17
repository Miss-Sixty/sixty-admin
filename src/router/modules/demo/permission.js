const Layout = () => import('@/layout/index.vue')
import { Box } from '@element-plus/icons-vue'
import { shallowRef } from 'vue'

export default {
  path: '/permission',
  component: Layout,
  redirect: '/permission/index',
  name: 'Permission',
  meta: {
    title: '权限验证',
    icon: shallowRef(Box),
  },
  children: [
    {
      path: 'index',
      name: 'PermissionIndex',
      component: () => import('@/views/demo/permission.vue'),
      meta: {
        sidebar: false,
        breadcrumb: false,
        activeMenu: '/permission',
      },
    },
  ],
}
