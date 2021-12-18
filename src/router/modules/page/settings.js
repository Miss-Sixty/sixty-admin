import Layout from '@/layout/index.vue'

export default {
  path: '/settings',
  component: Layout,
  redirect: '/settings/index',
  children: [
    {
      path: 'index',
      name: 'Settings',
      component: () => import('@/views/page/settings/index.vue'),
      meta: {
        title: '系统设置',
        icon: 'settings-5-fill-icon'
      }
    }
  ]
}
