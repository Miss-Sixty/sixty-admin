import Layout from '@/layout'

export default {
  path: '/icons',
  component: Layout,
  redirect: '/icons/index',
  meta: {
    title: '图标',
    icon: 'icon',
  },
  children: [
    {
      path: 'Svg-icons',
      name: 'SvgIcons',
      props: {
        type: 'svg',
      },
      component: () => import('@/views/icons'),
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
      component: () => import('@/views/icons'),
      meta: {
        title: 'Sketch 图标',
      },
    },
  ],
}
