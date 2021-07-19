import Layout from '@/layout'

export default {
  path: '/demo',
  component: Layout,
  redirect: '/demo/page',
  name: 'demo',
  meta: {
    title: '测试测试测试测试测试测试测试测试',
    icon: 'settings-5-fill',
  },
  children: [
    {
      path: '/demo/page',
      name: 'demopage',
      component: () => import('@/views/demo'),
      meta: {
        title: '这是测试页',
        // hidden: true,
        // activeMenu: "/demo",
        breadcrumb: true,
      },
    },
    {
      path: '/demo/page2',
      name: 'demopage2',
      component: () => import('@/views/demo/index2'),
      meta: {
        title: '这个不在侧边栏展示',
        // hidden: true,
        // activeMenu: "/demo",
        breadcrumb: false,
        // copyright: false,
      },
    },
  ],
}
