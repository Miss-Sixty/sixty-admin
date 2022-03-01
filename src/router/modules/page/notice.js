import Layout from '@/layout/index.vue'
import EmptyLayout from '@/layout/empty.vue'
import { HomeFilled } from '@element-plus/icons-vue'

export default {
  path: '/notice',
  component: Layout,
  redirect: '/notice/index',
  children: [
    {
      path: '',
      component: EmptyLayout,
      meta: {
        title: '通知公告',
        icon: HomeFilled,
      },
      children: [
        {
          path: '',
          name: 'Notice',
          component: () => import('@/views/page/notice/index.vue'),
        },
        {
          path: 'add',
          name: 'NoticeAdd',
          component: () => import('@/views/page/notice/addOrEdit/index.vue'),
          meta: {
            title: '新增通知公告',
            hidden: true,
            activeMenu: '/notice',
          },
        },
        {
          path: 'edit/:id',
          name: 'NoticeEdit',
          component: () => import('@/views/page/notice/addOrEdit/index.vue'),
          meta: {
            title: '修改通知公告',
            hidden: true,
            activeMenu: '/notice',
          },
        },
        {
          path: 'info/:id',
          name: 'NoticeInfo',
          component: () => import('@/views/page/notice/info.vue'),
          meta: {
            title: '公告详情',
            hidden: true,
            activeMenu: '/notice',
          },
        },
      ],
    },
  ],
}
