const Layout = () => import('@/layout/index.vue')
import { Box } from '@element-plus/icons-vue'
import { shallowRef } from 'vue'

export default {
  path: '/multilevel_menu',
  component: Layout,
  redirect: '/multilevel_menu/page',
  name: 'multilevelMenu',
  meta: {
    title: '多级导航',
    icon: shallowRef(Box),
  },
  children: [
    {
      path: 'page',
      name: 'multilevelMenu1',
      component: () => import('@/views/multilevel_menu/page.vue'),
      meta: {
        title: '导航1',
      },
    },
    {
      path: 'level2',
      name: 'multilevelMenu2',
      redirect: '/multilevel_menu/level2/page',
      meta: {
        title: '导航2',
      },
      children: [
        {
          path: 'page',
          name: 'multilevelMenu2-1',
          component: () => import('@/views/multilevel_menu/level2/page.vue'),
          meta: {
            title: '导航2-1',
          },
        },
        {
          path: 'level3',
          name: 'multilevelMenu2-2',
          redirect: '/multilevel_menu/level2/level3/page1',
          meta: {
            title: '导航2-2',
          },
          children: [
            {
              path: 'page1',
              name: 'multilevelMenu2-2-1',
              component: () => import('@/views/multilevel_menu/level2/level3/page1.vue'),
              meta: {
                title: '导航2-2-1',
              },
            },
            {
              path: 'page2',
              name: 'multilevelMenu2-2-2',
              component: () => import('@/views/multilevel_menu/level2/level3/page2.vue'),
              meta: {
                title: '导航2-2-2',
              },
            },
          ],
        },
      ],
    },
  ],
}
