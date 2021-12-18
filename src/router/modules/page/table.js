import Layout from '@/layout/index.vue'
import EmptyLayout from '@/layout/empty.vue'

export default {
  path: '/table',
  component: Layout,
  redirect: '/table/index',
  name: 'Table',
  children: [
    {
      path: '/table/index',
      component: EmptyLayout,
      meta: {
        activeMenu: '/table',
        title: '表格',
        icon: 'TableFill-icon'
      },
      children: [
        {
          path: '',
          name: 'TablePage',
          component: () => import('@/views/page/table/index.vue'),
          meta: {
            activeMenu: '/table/index'
          }
        },
        {
          path: 'add',
          name: 'TableAdd',
          component: () => import('@/views/page/table/addOrEdit/index.vue'),
          meta: {
            title: '新增员工',
            hidden: true,
            activeMenu: '/table/index'
          }
        },
        {
          path: 'edit/:id',
          name: 'TableEdit',
          component: () => import('@/views/page/table/addOrEdit/index.vue'),
          meta: {
            title: '修改员工',
            hidden: true,
            activeMenu: '/table'
          }
        }
      ]
    }
  ]
}
