import router from '@/router'
import NProgress from 'nprogress'
import { useUserStore } from '@/stores/user'
import { useMenuStore } from '@/stores/menu'
import useKeepAliveStore from '@/stores/keepAlive'
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
      return { path: to.fullPath, replace: true, query: to.query } // 动态添加路由后重定向
    }
  } catch (err) {
    console.log(err)
  }
})

router.afterEach((to, from) => {
  const keepAliveStore = useKeepAliveStore()
  NProgress.done()
  const title = import.meta.env.VITE_APP_TITLE
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title

  // 判断当前页面是否开启缓存，如果开启，则将当前页面的 name 信息存入 keep-alive 全局状态
  if (to.meta.cache) {
    let componentName = to.matched[to.matched.length - 1].components.default.name
    if (componentName) {
      keepAliveStore.add(componentName)
    } else {
      console.warn('该页面组件未设置组件名，会导致缓存失效，请检查')
    }
  }

  // 判断离开页面是否开启缓存，如果开启，则根据缓存规则判断是否需要清空 keep-alive 全局状态里离开页面的 name 信息
  if (from.meta.cache) {
    let componentName = from.matched[from.matched.length - 1].components.default.name
    // 通过 meta.cache 判断针对哪些页面进行缓存
    switch (typeof from.meta.cache) {
      case 'string':
        if (from.meta.cache != to.name) {
          keepAliveStore.remove(componentName)
        }
        break
      case 'object':
        if (!from.meta.cache.includes(to.name)) {
          keepAliveStore.remove(componentName)
        }
        break
    }
    // 如果进入的是 reload 页面，则也将离开页面的缓存清空
    if (to.name == 'reload') {
      keepAliveStore.remove(componentName)
    }
  }
})
