import Layout from '@/layout/index.vue'

export default {
  path: '/example',
  component: Layout,
  redirect: '/example/list',
  children: [
    {
      path: 'list',
      name: 'List',
      component: () => import('@/views/page/example/index.vue'),
      meta: {
        title: '通用列表面',
        icon: 'badge-fill-icon'
      }
    },
    {
      path: 'list-create',
      name: 'ListCreate',
      component: () => import('@/views/page/example/detail.vue'),
      meta: {
        title: '新增信息',
        hidden: true
      }
    },
    {
      path: 'list-edit/:id',
      name: 'ListEdit',
      component: () => import('@/views/page/example/detail.vue'),
      meta: {
        title: '修改信息',
        hidden: true
      }
    }
  ]
}
