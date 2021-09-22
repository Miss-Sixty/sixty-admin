import Layout from '@/layout'

export default {
  path: '/permission',
  component: Layout,
  redirect: '/permission/index',
  children: [
    {
      path: 'index',
      name: 'Permission',
      component: () => import('@/views/permission'),
      meta: {
        title: '权限验证',
        icon: 'ShieldKeyholeFill',
      },
    },
  ],
}
