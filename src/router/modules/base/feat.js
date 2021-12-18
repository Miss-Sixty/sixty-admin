import Layout from '@/layout/index.vue'

export default {
  path: '/feat',
  component: Layout,
  name: 'Feat',
  redirect: '/feat/full-screen',
  meta: {
    title: '功能',
    icon: 'code-box-fill-icon'
  },
  children: [
    {
      path: 'full-screen',
      name: 'FullScreen',
      component: () => import('@/views/base/feat/fullScreen/index.vue'),
      meta: {
        title: '全屏'
      }
    },
    {
      path: 'clipboard',
      name: 'Clipboard',
      component: () => import('@/views/base/feat/clipboard/index.vue'),
      meta: {
        title: '复制文本'
      }
    },
    {
      path: 'countTo',
      name: 'CountTo',
      component: () => import('@/views/base/feat/countTo/index.vue'),
      meta: {
        title: '数字过渡'
      }
    },
    {
      path: 'download',
      name: 'Download',
      component: () => import('@/views/base/feat/download/index.vue'),
      meta: {
        title: '下载文件'
      }
    },
    {
      path: 'browser-notification',
      name: 'browserNotification',
      component: () => import('@/views/base/feat/browserNotification/index.vue'),
      meta: {
        title: '桌面通知'
      }
    }
  ]
}
