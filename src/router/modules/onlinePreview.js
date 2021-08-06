import Layout from '@/layout'

export default {
  path: '/onlinePreview',
  component: Layout,
  redirect: '/onlinePreview/page',
  meta: {
    title: 'Office 预览',
    icon: 'FileWord2Fill',
  },
  children: [
    {
      path: '/onlinePreview/page',
      name: 'OnlinePreview',
      component: () => import('@/views/onlinePreview'),
      meta: {
        copyright: false,
        hidden: true,
        activeMenu: '/onlinePreview',
      },
    },
  ],
}
