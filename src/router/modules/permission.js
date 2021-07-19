import Layout from '@/layout'

export default {
  path: '/permission',
  component: Layout,
  redirect: '/permission/page',
  name: 'Permission',
  meta: {
    title: '权限验证',
    icon: 'settings-5-fill',
  },
  children: [
    {
      path: '/permission/page',
      name: 'permissionPage',
      component: () => import('@/views/permission'),
      meta: {
        title: '这是测试页',
        hidden: true,
        activeMenu: '/permission',
      },
    },
  ],
}
