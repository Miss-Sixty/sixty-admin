const Layout = () => import('@/layout/index.vue')
import { Box } from '@element-plus/icons-vue'
import { shallowRef } from 'vue'

export default {
  path: '/component_extend',
  component: Layout,
  redirect: '/component_extend/svg',
  name: 'componentExtendExample',
  meta: {
    title: '扩展组件',
    icon: shallowRef(Box),
  },
  children: [
    {
      path: 'svg',
      name: 'componentExtendSvg',
      component: () => import('@/views/demo/component_extend/svg.vue'),
      meta: {
        title: 'SVG Icon',
      },
    },
    {
      path: 'actionbar',
      name: 'componentExtendActionbar',
      component: () => import('@/views/demo/component_extend/actionbar.vue'),
      meta: {
        title: '固定底部操作栏',
      },
    },
    {
      path: 'trend',
      name: 'componentExtendTrend',
      component: () => import('@/views/demo/component_extend/trend.vue'),
      meta: {
        title: '趋势符号',
      },
    },
    {
      path: 'clipboard',
      name: 'componentExtendClipboard',
      component: () => import('@/views/demo/component_extend/clipboard.vue'),
      meta: {
        title: '文本复制',
      },
    },
    {
      path: 'countUp',
      name: 'componentExtendCountUp',
      component: () => import('@/views/demo/component_extend/countUp.vue'),
      meta: {
        title: '数字过渡',
      },
    },
  ],
}
