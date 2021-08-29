import Layout from '@/layout'

export default {
  path: '/onlinePreview',
  component: Layout,
  redirect: '/onlinePreview/index',
  children: [
    {
      path: 'index',
      name: 'OnlinePreview',
      component: () => import('@/views/onlinePreview'),
      meta: {
        copyright: false,
        title: 'Office 预览',
        icon: 'FileWord2Fill',
      },
    },
  ],
}
