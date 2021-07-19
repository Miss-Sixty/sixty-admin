import Layout from '@/layout'
import Iframe from '@/layout/iframe'

export default {
  path: '/link',
  component: Layout,
  name: 'externalLinkExample',
  meta: {
    title: '外链',
    icon: 'share-box-fill',
  },
  children: [
    {
      path: 'https://www.baidu.com',
      meta: {
        title: '百度一下',
      },
    },
    {
      path: 'https://www.google.com',
      meta: {
        title: 'Google 一下',
      },
    },
    {
      path: 'google',
      component: Iframe,

      meta: {
        title: '内嵌百度',
        link: 'https://www.baidu.com',
      },
    },
  ],
}
