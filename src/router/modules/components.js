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
    {
      path: '/components/confirmSwitch',
      name: 'ConfirmSwitch',
      component: () => import('@/views/components/confirmSwitch'),
      meta: {
        title: '弹窗确认 Switch',
      },
    },
    {
      path: '/components/pagination',
      name: 'Pagination',
      component: () => import('@/views/components/pagination'),
      meta: {
        title: '分页',
      },
    },
    {
      path: '/components/upload',
      name: 'Upload',
      component: () => import('@/views/components/upload'),
      meta: {
        title: '上传',
      },
    },
    {
      path: '/components/clipboard',
      name: 'Clipboard',
      component: () => import('@/views/components/clipboard'),
      meta: {
        title: '复制文本',
      },
    },
    {
      path: '/components/editor',
      name: 'Editor',
      component: () => import('@/views/components/editor'),
      meta: {
        title: '编辑器',
      },
    },
  ],
}
