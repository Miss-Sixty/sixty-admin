import Layout from '@/layout/index.vue'
import { HomeFilled } from '@element-plus/icons-vue'

export default {
  path: '/organization',
  component: Layout,
  redirect: '/organization/department',
  meta: {
    title: '通用列表面',
    icon: HomeFilled,
  },
  children: [
    {
      path: 'department',
      name: 'department',
      component: () => import('@/views/page/organization/department/index.vue'),
      meta: {
        title: '部门管理',
      },
    },
    {
      path: 'department-create',
      name: 'departmentCreate',
      component: () => import('@/views/page/organization/department/detail.vue'),
      meta: {
        title: '新增部门',
      },
    },
  ],
}
