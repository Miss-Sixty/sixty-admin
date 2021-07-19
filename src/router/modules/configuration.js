import Layout from '@/layout'
import EmptyLayout from '@/layout/empty'

export default {
  path: '/configuration',
  component: Layout,
  redirect: '/configuration/account-setting',
  name: 'Configuration',
  meta: {
    title: '配置',
    icon: 'user-settings-fill',
  },
  children: [
    {
      path: 'account-setting',
      name: 'ConfigurationUser',
      component: () => import('@/views/configuration/user'),
      meta: {
        title: '个人设置',
      },
    },

    {
      path: 'department',
      name: 'Department',
      component: EmptyLayout,
      redirect: '/configuration/department',
      meta: {
        title: '部门管理',
      },
      children: [
        {
          path: '',
          component: () => import('@/views/configuration/department'),
          meta: {
            hidden: true,
          },
        },
        {
          path: 'add-or-edit',
          name: 'DepartmentAddOrEdit',
          component: () => import('@/views/configuration/department/addOrEdit'),
          meta: {
            title: '添加部门',
            hidden: true,
            activeMenu: '/configuration/department',
          },
        },
        {
          path: 'job',
          name: 'Job',
          redirect: '/configuration/department/job',
          component: EmptyLayout,
          meta: {
            title: '职位管理',
            hidden: true,
          },
          children: [
            {
              path: '',
              component: () => import('@/views/configuration/department/job'),
              meta: {
                hidden: true,
                activeMenu: '/configuration/department',
              },
            },
            {
              path: 'add-or-edit',
              name: 'JobAddOrEdit',
              component: () => import('@/views/configuration/department/job/addOrEdit'),
              meta: {
                title: '添加职位',
                hidden: true,
                activeMenu: '/configuration/department',
              },
            },
          ],
        },
      ],
    },
  ],
}
