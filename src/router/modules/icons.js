import Layout from '@/layout/index.vue'

export default {
  path: '/icons',
  component: Layout,
  redirect: '/icons/index',
  meta: {
    title: '图标',
    icon: 'icon-icon',
  },
  children: [
    {
      path: 'svg-icons',
      name: 'SvgIcons',
      props: {
        type: 'svg',
      },
      component: () => import('@/views/icons/index.vue'),
      meta: {
        title: 'SVG 图标',
      },
    },
    {
      path: 'sketch-icons',
      name: 'SketchIcons',
      props: {
        type: 'sketch',
      },
      component: () => import('@/views/icons/index.vue'),
      meta: {
        title: 'Sketch 图标',
      },
    },
  ],
}
