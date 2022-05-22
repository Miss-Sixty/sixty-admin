const Layout = () => import('@/layout/index.vue')

export default {
  path: '/breadcrumb',
  component: Layout,
  redirect: '/breadcrumb/list1',
  name: 'breadcrumbExample',
  meta: {
    title: '面包屑导航',
    icon: 'sidebar-breadcrumb',
  },
  children: [
    {
      path: 'list1',
      name: 'breadcrumbExampleList1',
      component: () => import('@/views/breadcrumb/list1.vue'),
      meta: {
        title: '列表1（平级模式）',
        sidebar: false,
      },
      children: [
        {
          path: '',
          component: () => import('@/views/breadcrumb/list2.vue'),
          meta: {
            title: '列表2（层级模式）',
            sidebar: false,
            breadcrumb: false,
          },
        },
        {
          path: 'detail2',
          name: 'breadcrumbExampleDetail2',
          component: () => import('@/views/breadcrumb/detail2.vue'),
          meta: {
            title: '详情2',
            sidebar: false,
            activeMenu: '/breadcrumb/list2',
          },
        },
      ],
    },
    {
      path: 'detail1',
      name: 'breadcrumbExampleDetail1',
      component: () => import('@/views/breadcrumb/detail1.vue'),
      meta: {
        title: '详情1',
        sidebar: false,
        activeMenu: '/breadcrumb/list1',
      },
    },
  ],
}
