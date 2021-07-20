import Layout from '@/layout'

export default {
  path: '/components',
  component: Layout,
  redirect: '/components/page',
  name: 'Components',
  meta: {
    title: '拓展组件',
    icon: 'settings-5-fill',
  },
  children: [
    {
      path: '/components/pageheader',
      name: 'Pageheader',
      component: () => import('@/views/components/pageheader'),
      meta: {
        title: '页头',
      },
    },
    {
      path: '/components/fixedActionBar',
      name: 'FixedActionBar',
      component: () => import('@/views/components/fixedActionBar'),
      meta: {
        title: '固定底部操作栏',
      },
    },
  ],
}