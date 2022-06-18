const Layout = () => import('@/layout/index.vue')
import { Box } from '@element-plus/icons-vue'
import { shallowRef } from 'vue'

export default {
  path: '/print',
  component: Layout,
  redirect: '/print/index',
  name: 'Print',
  meta: {
    title: '打印 Print',
    icon: shallowRef(Box),
  },
  children: [
    {
      path: 'index',
      name: 'PrintIndex',
      component: () => import('@/views/demo/print.vue'),
      meta: {
        sidebar: false,
        breadcrumb: false,
        activeMenu: '/print',
      },
    },
  ],
}
