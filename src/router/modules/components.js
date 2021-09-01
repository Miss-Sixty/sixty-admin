import Layout from '@/layout'

export default {
  path: '/components',
  component: Layout,
  redirect: '/components/pageheader',
  name: 'Components',
  meta: {
    title: '拓展组件',
    icon: 'CollageFill',
  },
  children: [
    {
      path: 'pageheader',
      name: 'Pageheader',
      component: () => import('@/views/components/pageheader'),
      meta: {
        title: '页头',
      },
    },
    {
      path: 'fixedActionBar',
      name: 'FixedActionBar',
      component: () => import('@/views/components/fixedActionBar'),
      meta: {
        title: '固定底部操作栏',
      },
    },
    {
      path: 'confirmSwitch',
      name: 'ConfirmSwitch',
      component: () => import('@/views/components/confirmSwitch'),
      meta: {
        title: '弹窗确认 Switch',
      },
    },
    {
      path: 'pagination',
      name: 'Pagination',
      component: () => import('@/views/components/pagination'),
      meta: {
        title: '分页',
      },
    },
    {
      path: 'upload',
      name: 'Upload',
      component: () => import('@/views/components/upload'),
      meta: {
        title: '上传',
      },
    },
    {
      path: 'clipboard',
      name: 'Clipboard',
      component: () => import('@/views/components/clipboard'),
      meta: {
        title: '复制文本',
      },
    },
    {
      path: 'editor',
      name: 'Editor',
      component: () => import('@/views/components/editor'),
      meta: {
        title: '富文本编辑器',
      },
    },
    {
      path: 'countTo',
      name: 'CountTo',
      component: () => import('@/views/components/countTo'),
      meta: {
        title: '数字过渡',
      },
    },
  ],
}
