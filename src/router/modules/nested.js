import Layout from '@/layout/index.vue'

export default {
  path: '/nested',
  component: Layout,
  redirect: '/nested/menu1/menu1-1',
  name: 'Nested',
  meta: {
    title: '多级导航',
    icon: 'Nested-icon',
  },
  children: [
    {
      path: '/nested/menu1',
      component: () => import('@/views/nested/menu1/index.vue'),
      name: 'Menu1',
      meta: { title: '菜单 1' },
      redirect: '/nested/menu1/menu1-1',
      children: [
        {
          path: '/nested/menu1/menu1-1',
          component: () => import('@/views/nested/menu1/menu1-1/index.vue'),
          name: 'Menu1-1',
          meta: { title: '菜单 1-1' },
        },
        {
          path: '/nested/menu1/menu1-2',
          component: () => import('@/views/nested/menu1/menu1-2/index.vue'),
          name: 'Menu1-2',
          redirect: '/nested/menu1/menu1-2/menu1-2-1',
          meta: { title: '菜单 1-2' },
          children: [
            {
              path: '/nested/menu1/menu1-2/menu1-2-1',
              component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
              name: 'Menu1-2-1',
              meta: { title: '菜单 1-2-1' },
            },
            {
              path: '/nested/menu1/menu1-2/menu1-2-2',
              component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
              name: 'Menu1-2-2',
              meta: { title: '菜单 1-2-2' },
            },
          ],
        },
        {
          path: '/nested/menu1/menu1-3',

          component: () => import('@/views/nested/menu1/menu1-3/index.vue'),
          name: 'Menu1-3',
          meta: { title: '菜单 1-3' },
        },
      ],
    },
    {
      path: '/nested/menu2',

      name: 'Menu2',
      component: () => import('@/views/nested/menu2/index.vue'),
      meta: { title: '菜单 2' },
    },
  ],
}
