import Layout from '@/layout'

export default {
  path: '/icons',
  component: Layout,
  redirect: '/icons/page',
  meta: {
    title: '图标',
    icon: 'icon',
  },
  children: [
    {
      path: 'page',
      name: 'SketchIcons',
      props: {
        type: 'sketch',
      },
      component: () => import('@/views/icons'),
      meta: {
        title: 'Sketch 图标',
      },
    },
    {
      path: 'page/svg',
      name: 'SvgIcons',
      props: {
        type: 'svg',
      },
      component: () => import('@/views/icons'),
      meta: {
        title: 'SVG 图标',
      },
    },
  ],
}
