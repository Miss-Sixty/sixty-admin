import Layout from '@/layout'
import EmptyLayout from '@/layout/empty'
import Iframe from '@/layout/iframe'

export default {
  path: '/link',
  component: Layout,
  name: 'Link',
  meta: {
    title: '外链',
    icon: 'share-box-fill',
  },
  children: [
    {
      path: 'blank',
      component: EmptyLayout,
      meta: {
        title: '新窗口打开',
      },
      children: [
        {
          path: 'https://www.baidu.com',
          meta: {
            title: '百度一下',
          },
        },
        {
          path: 'https://github.com/Miss-Sixty/sixty-admin',
          meta: {
            title: 'Github 仓库',
          },
        },
      ],
    },
    {
      path: 'iframe',
      component: EmptyLayout,
      meta: {
        title: '内嵌打开',
      },
      children: [
        {
          path: 'baidu',
          component: Iframe,
          meta: {
            title: '百度一下',
            link: 'https://www.baidu.com',
            copyright: false,
          },
        },
      ],
    },
  ],
}
