import router from '@/router'
import NProgress from 'nprogress'
import { useUserStore } from '@/stores/user'
import { useMenuStore } from '@/stores/menu'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false }) // 去掉加载圆圈

router.beforeEach(async (to) => {
  const userStore = useUserStore()
  const menuStore = useMenuStore()

  try {
    NProgress.start()
    // 未登录则跳转登陆页
    if (!userStore.token) return to.name !== 'login' ? { name: 'login', query: { redirect: to.fullPath } } : true

    // 已登陆不可跳转登陆页
    if (to.name === 'login') return false

    // 已登陆，未添加动态路由
    if (!menuStore.isAllRoutes) {
      await menuStore.initRoutes()
      // return { path: to.fullPath, replace: true, query: to.query } // 动态添加路由后重定向
    }
  } catch (err) {
    console.log(err)
  }
})

router.afterEach((to, from) => {
  NProgress.done()

  const title = import.meta.env.VITE_APP_TITLE
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title
})
