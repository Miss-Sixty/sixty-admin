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
  ],
}
