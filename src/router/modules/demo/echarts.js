const Layout = () => import('@/layout/index.vue')
import { Box } from '@element-plus/icons-vue'
import { shallowRef } from 'vue'

export default {
  path: '/echarts',
  component: Layout,
  redirect: '/echarts/index',
  name: 'Echarts',
  meta: {
    title: '图表 ECharts',
    icon: shallowRef(Box),
  },
  children: [
    {
      path: 'index',
      name: 'EchartsIndex',
      component: () => import('@/views/demo/echarts.vue'),
      meta: {
        sidebar: false,
        breadcrumb: false,
        activeMenu: '/echarts',
      },
    },
  ],
}
