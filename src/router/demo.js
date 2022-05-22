const Layout = () => import('@/layout/index.vue')
import { Box } from '@element-plus/icons-vue'
import { markRaw } from 'vue'

export default {
  path: '/demo',
  component: Layout,
  redirect: '/demo/level',
  name: 'componentExtendExample',
  meta: {
    title: '扩展组件',
    // icon: markRaw(Box),
  },
  children: [
    {
      path: 'level',
      name: 'componentExtendExampleSvg',
      redirect: '/demo/level/aaa',
      meta: {
        title: '中间层级',
        // auth: ['data'],
      },
      children: [
        {
          path: 'aaa',
          name: 'aaa',
          component: () => import('@/views/demo/aaa.vue'),
          meta: {
            title: 'aaa',
            // auth: ['data'],
          },
        },
        {
          path: 'bbb',
          name: 'bbb',
          component: () => import('@/views/demo/bbb.vue'),
          meta: {
            title: 'bbb',
            // auth: ['data'],
          },
        },
      ],
    },
    {
      path: 'pageheader',
      name: 'componentExtendExamplePageheader',
      component: () => import('@/views/demo/pageheader.vue'),
      meta: {
        title: '页头',
        // auth: ['data1'],
      },
    },
  ],
}
