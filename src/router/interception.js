import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false }) // 去掉加载圆圈
import { useUserStoreWithOut } from '@/store/modules/user'
import { useMenuStoreWithOut } from '@/store/modules/menu'
import { useSettingStoreWithOut } from '@/store/modules/setting'
const userStore = useUserStoreWithOut()
const menuStore = useMenuStoreWithOut()
const settingStore = useSettingStoreWithOut()

router.beforeEach(async to => {
  try {
    NProgress.start()

    //未登录或登陆过期，前往登陆页则放行，否则跳转登陆页
    if (!userStore.token) return to.name !== 'Login' ? { name: 'Login', query: { redirect: to.fullPath } } : true

    //已登陆不可跳转登陆页，路由不跳转。
    if (to.name === 'Login') return false

    //如果登陆但没有路由，则请求权限并动态添加有权限的路由
    if (!menuStore.allRoutes.length) {
      await userStore.getRoleList(to.path)
      return { path: to.fullPath, replace: true, query: to.query } //动态添加路由后重定向
    } else {
      return menuStore.setActived(to.path)
    }
  } catch (err) {
    console.log(err)
  }

  return menuStore.setActived(to.path)
})

router.afterEach(to => {
  NProgress.done()
  if (to.name === 'Reload') return
  const title = settingStore.title
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : `${title}`
})
