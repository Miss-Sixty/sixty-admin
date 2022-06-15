const Layout = () => import('@/layout/index.vue')
import { Box } from '@element-plus/icons-vue'
import { shallowRef } from 'vue'

export default {
  path: '/keep_alive_page',
  component: Layout,
  redirect: '/keep_alive_page/page',
  name: 'keepAlivePage',
  meta: {
    title: '页面缓存',
    icon: shallowRef(Box),
  },
  children: [
    {
      path: 'index',
      name: 'keepAlivePageIndex',
      component: () => import('@/views/demo/keep_alive_page/index.vue'),
      meta: {
        title: '页面缓存',
        breadcrumb: false,
      },
    },
    {
      path: 'detail',
      name: 'keepAlivePageDetail',
      component: () => import('@/views/demo/keep_alive_page/detail.vue'),
      meta: {
        title: '平级路由',
        sidebar: false,
        activeMenu: '/keep_alive_page/page',
      },
    },
    {
      path: 'nested',
      redirect: '/keep_alive_page/detail2',
      meta: {
        title: '下级路由',
        sidebar: false,
      },
      children: [
        {
          path: 'detail',
          name: 'keepAlivePageNestedDetail',
          component: () => import('@/views/demo/keep_alive_page/detail.vue'),
          meta: {
            title: '测试页面',
            activeMenu: '/keep_alive_page/page',
          },
        },
      ],
    },
    {
        path: 'nested',
        name: 'keepAliveExampleNested1',
        component: () => import('@/views/demo/keep_alive_page/nested/nested.vue'),
        meta: {
            title: '路由多级缓存(1)'
        },
        children: [
            {
                path: 'nested',
                name: 'keepAliveExampleNested2',
                component: () => import('@/views/demo/keep_alive_page/nested/nested/nested.vue'),
                meta: {
                    title: '路由多级缓存(1-1)'
                },
                children: [
                    {
                        path: 'test',
                        name: 'keepAliveExampleNestedTest',
                        component: () => import('@/views/demo/keep_alive_page/nested/nested/nested/index.vue'),
                        meta: {
                            title: '测试页面(1-1-1)',
                            cache: true
                        }
                    }
                ]
            }
        ]
    }
  ],
}
