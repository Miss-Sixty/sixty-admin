import Layout from '@/layout'

export default {
  path: '/user',
  component: Layout,
  redirect: '/user/page',
  meta: {
    title: '个人设置',
    icon: 'settings-5-fill',
  },
  children: [
    {
      path: '/user/page',
      name: 'UserPage',
      component: () => import('@/views/user'),
      meta: {
        hidden: true,
        activeMenu: '/user',
      },
    },
  ],
}
