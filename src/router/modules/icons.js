import Layout from '@/layout/index.vue'
import { HomeFilled } from '@element-plus/icons-vue'

export default {
  path: '/icons',
  component: Layout,
  redirect: '/icons/index',
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
        icon: HomeFilled,
      },
    },
  ],
}
