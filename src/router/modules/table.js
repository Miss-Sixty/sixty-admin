import Layout from '@/layout'
import EmptyLayout from '@/layout/empty'

export default {
  path: '/table',
  component: Layout,
  redirect: '/table/page',
  name: 'Table',
  meta: {
    title: '表格',
    icon: 'TableFill',
  },
  children: [
    {
      path: '/table/page',
      component: EmptyLayout,
      meta: {
        hidden: true,
        activeMenu: '/table',
      },
      children: [
        {
          path: '',
          name: 'TablePage',
          component: () => import('@/views/table'),
          meta: {
            hidden: true,
          },
        },
        {
          path: 'add',
          name: 'TableAdd',
          component: () => import('@/views/table/addOrEdit'),
          meta: {
            title: '新增员工',
            hidden: true,
            activeMenu: '/table',
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
