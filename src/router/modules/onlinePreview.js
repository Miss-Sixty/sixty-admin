import Layout from '@/layout/index.vue'

export default {
  path: '/onlinePreview',
  component: Layout,
  redirect: '/onlinePreview/index',
  children: [
    {
      path: 'index',
      name: 'OnlinePreview',
      component: () => import('@/views/onlinePreview/index.vue'),
      meta: {
        copyright: false,
        title: 'Office 预览',
        icon: 'HomeFilled',
      },
    },
  ],
}
