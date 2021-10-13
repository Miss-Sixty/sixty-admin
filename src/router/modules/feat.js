import Layout from '@/layout'

export default {
  path: '/feat',
  component: Layout,
  name: 'Feat',
  redirect: '/feat/full-screen',
  meta: {
    title: '功能',
    icon: 'code-box-fill',
  },
  children: [
    {
      path: 'full-screen',
      name: 'FullScreen',
      component: () => import('@/views/feat/fullScreen'),
      meta: {
        title: '全屏',
      },
    },
    {
      path: 'clipboard',
      name: 'Clipboard',
      component: () => import('@/views/feat/clipboard'),
      meta: {
        title: '复制文本',
      },
    },
    {
      path: 'countTo',
      name: 'CountTo',
      component: () => import('@/views/feat/countTo'),
      meta: {
        title: '数字过渡',
      },
    },
    {
      path: 'download',
      name: 'Download',
      component: () => import('@/views/feat/download'),
      meta: {
        title: '下载文件',
      },
    },
  ],
}
