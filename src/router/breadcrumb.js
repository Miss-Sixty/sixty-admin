const Layout = () => import('@/layout/index.vue')
import { Box } from '@element-plus/icons-vue'
import { shallowRef } from 'vue'

export default {
  path: '/breadcrumb',
  component: Layout,
  redirect: '/breadcrumb/list1',
  name: 'breadcrumb',
  meta: {
      title: '面包屑导航',
      icon: shallowRef(Box)
  },
  children: [
      {
          path: 'list1',
          name: 'breadcrumbList1',
          component: () => import('@/views/breadcrumb/list1.vue'),
          meta: {
              title: '列表1（平级模式）'
          }
      },
      {
          path: 'detail1',
          name: 'breadcrumbDetail1',
          component: () => import('@/views/breadcrumb/detail1.vue'),
          meta: {
              title: '详情1',
              sidebar: false,
              activeMenu: '/breadcrumb/list1'
          }
      },
      {
          path: 'list2',
          name: 'breadcrumbList2',
          redirect: '/breadcrumb/list2',
          meta: {
              title: '列表2（层级模式）'
          },
          children: [
              {
                  path: '',
                  component: () => import('@/views/breadcrumb/list2.vue'),
                  meta: {
                      title: '列表2（层级模式）',
                      sidebar: false,
                      breadcrumb: false
                  }
              },
              {
                  path: 'detail2',
                  name: 'breadcrumbDetail2',
                  component: () => import('@/views/breadcrumb/detail2.vue'),
                  meta: {
                      title: '详情2',
                      sidebar: false,
                      activeMenu: '/breadcrumb/list2'
                  }
              }
          ]
      }
  ]
}
