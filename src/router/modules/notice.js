import Layout from '@/layout/index.vue'
import EmptyLayout from '@/layout/empty.vue'

export default {
  path: '/notice',
  component: Layout,
  redirect: '/notice/index',
  meta: {
    title: '通知公告',
    icon: 'message-2-fill-icon',
  },
  children: [
    {
      path: '/notice/index',
      component: EmptyLayout,
      children: [
        {
          path: '',
          name: 'Notice',
          component: () => import('@/views/notice/index/index.vue'),
          meta: {
            title: '公告列表',
          },
        },
        {
          path: 'add',
          name: 'NoticeAdd',
          component: () => import('@/views/notice/index/addOrEdit/index.vue'),
          meta: {
            title: '新增',
            hidden: true,
            activeMenu: '/notice/index',
          },
        },
        {
          path: 'edit/:id',
          name: 'NoticeEdit',
          component: () => import('@/views/notice/index/addOrEdit/index.vue'),
          meta: {
            title: '修改',
            hidden: true,
            activeMenu: '/notice/index',
          },
        },
      ],
    },
    {
      path: '/notice/type',
      component: EmptyLayout,
      children: [
        {
          path: '',
          name: 'NoticeType',
          component: () => import('@/views/notice/type/index.vue'),
          meta: {
            title: '公告类型',
          },
        },
        {
          path: 'add',
          name: 'NoticeTypeAdd',
          component: () => import('@/views/notice/type/addOrEdit/index.vue'),
          meta: {
            title: '新增',
            hidden: true,
            activeMenu: '/notice/type',
          },
        },
        {
          path: 'edit/:id',
          name: 'NoticeTypeEdit',
          component: () => import('@/views/notice/type/addOrEdit/index.vue'),
          meta: {
            title: '修改',
            hidden: true,
            activeMenu: '/notice/type',
          },
        },
      ],
    },
  ],
}
