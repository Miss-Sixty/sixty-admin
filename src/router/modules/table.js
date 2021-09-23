import Layout from '@/layout'
import EmptyLayout from '@/layout/empty'

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
        icon: 'TableFill',
      },
      children: [
        {
          path: '',
          name: 'TablePage',
          component: () => import('@/views/table'),
          meta: {
            activeMenu: '/table/index',
          },
        },
        {
          path: 'add',
          name: 'TableAdd',
          component: () => import('@/views/table/addOrEdit'),
          meta: {
            title: '新增员工',
            hidden: true,
            activeMenu: '/table/index',
          },
        },
        {
          path: 'edit/:id',
          name: 'TableEdit',
          component: () => import('@/views/table/addOrEdit'),
          meta: {
            title: '修改员工',
            hidden: true,
            activeMenu: '/table',
          },
        },
      ],
    },
  ],
}
