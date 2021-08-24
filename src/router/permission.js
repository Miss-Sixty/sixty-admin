import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false }) // 去掉加载圆圈
import store from '@/store'
import { ElMessage, ElLoading } from 'element-plus'
import setting from '@/setting'

let loadingInstance
router.beforeEach(async (to, from) => {
  NProgress.start()
  const isLogin = store.getters['user/isLogin']
  if (isLogin) {
    //已登陆不可跳转登陆页
    if (to.name === 'Login') return false

    //判断是否已有权限
    const hasRoles = store.state.user.roles?.length
    if (hasRoles) return

    try {
      loadingInstance = ElLoading.service({
        lock: true,
        text: '获取权限中...',
        spinner: 'el-icon-loading',
      })

      const roles = await store.dispatch('user/permissions')
      const accessRoutes = await store.dispatch('menu/generateRoutes', {
        roles,
        currentPath: to.path,
      })
      accessRoutes.forEach(route => {
        router.addRoute(route)
      })
      loadingInstance.close()

      if (from.name === 'Login') {
        ElMessage.success({
          message: '登陆成功！',
          type: 'success',
        })
      }

      return { ...to, replace: true }
    } catch (error) {
      await store.commit('user/LOGOUT')
      ElMessage.error(error || 'Has Error')
      loadingInstance.close()
      return {
        name: 'Login',
        query: {
          redirect: to.fullPath,
        },
      }
    }
  } else if (to.name !== 'Login') {
    return {
      name: 'Login',
      query: {
        redirect: to.fullPath,
      },
    }
  }
})

router.afterEach(async to => {
  NProgress.done()
  if (to.name === 'Reload') return
  const title = setting.title || 'sixty-admin'
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : `${title}`

  const isLogin = store.getters['user/isLogin']
  const hasRoles = store.state.user.roles?.length
  if (isLogin && hasRoles) {
    await store.dispatch('user/getNotice')
  }
})
