const Layout = () => import('@/layout/index.vue')
import { Box } from '@element-plus/icons-vue'
import { shallowRef } from 'vue'

export default {
  path: '/table',
  component: Layout,
  redirect: '/table/index',
  name: 'Table',
  meta: {
    title: '表格',
    icon: shallowRef(Box),
  },
  children: [
    {
      path: 'index',
      name: 'TableIndex',
      component: () => import('@/views/page/table.vue'),
      meta: {
        sidebar: false,
        breadcrumb: false,
        title: '列表1（平级模式）',
        activeMenu: '/table'
      },
    },
  ],
}
