import Layout from '@/layout/index.vue'

export default {
  path: '/user',
  component: Layout,
  redirect: '/user/index',
  children: [
    {
      path: 'index',
      name: 'User',
      component: () => import('@/views/user/index.vue'),
      meta: {
        title: '个人设置',
        icon: 'settings-5-fill',
      },
    },
  ],
}
