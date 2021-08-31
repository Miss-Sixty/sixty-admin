import router from '@/router'
import store from '@/store'
import { ElMessage, ElLoading } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false }) // 去掉加载圆圈

router.beforeEach(async (to, from) => {
  NProgress.start()

  //未登录或登陆过期
  const isLogin = store.getters['user/isLogin']
  if (!isLogin) return to.name !== 'Login' ? { name: 'Login', query: { redirect: to.fullPath } } : true

  //已登陆不可跳转登陆页
  if (to.name === 'Login') return false

  //已获得用户权限
  // TODO：更改为计算属性直接判断是否有权限
  if (store.state.user.roles?.length) return

  let loadingInstance = ElLoading.service({
    lock: true,
    text: '获取权限中...',
    spinner: 'el-icon-loading',
  })

  try {
    const roles = await store.dispatch('user/permissions')
    const accessRoutes = await store.dispatch('menu/generateRoutes', {
      roles,
      currentPath: to.path,
    })

    // 记录的 accessRoutes 路由数据，在登出时用来删除动态路由
    const removeRoutes = accessRoutes.map(route => router.addRoute(route))
    store.commit('menu/SET_REMOVE_ROUTERS', removeRoutes)
  } catch (error) {
    await store.commit('user/CLEAR_USER_INFO')
    ElMessage.error(error || '获取权限错误，请重试！')
    loadingInstance.close()
    return { name: 'Login', query: { redirect: to.fullPath } }
  }

  loadingInstance.close()
  //如果登陆成功，则提醒。
  if (from.name === 'Login') ElMessage.success('登陆成功！')
  return to.fullPath
})

router.afterEach(async to => {
  NProgress.done()
  if (to.name === 'Reload') return
  const title = store.state.setting.title
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : `${title}`
})
