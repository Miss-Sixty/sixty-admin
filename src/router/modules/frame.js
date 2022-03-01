import Layout from '@/layout/index.vue'
import Iframe from '@/layout/iframe.vue'
import { HomeFilled } from '@element-plus/icons-vue'

export default {
  path: '/link',
  component: Layout,
  name: 'Link',
  redirect: '/link/element-plus',
  meta: {
    title: '外部页面',
    icon: HomeFilled,
  },
  children: [
    {
      path: 'element-plus',
      component: Iframe,
      name: 'Doc',
      meta: {
        title: 'element-plus（内嵌）',
        link: 'https://element-plus.gitee.io/#/zh-CN/component/installation',
      },
    },
    {
      path: 'https://element-plus.gitee.io/#/zh-CN/component/installation',
      name: 'DocExternal',
      meta: {
        title: 'element-plus（外链）',
      },
    },
  ],
}
