import { defineStore } from 'pinia'
import stores from '@/stores'
import router from '@/router'
import { useMenuStore } from './menu'
import { tokenApi, rulesApi, logoutApi, userInfoApi } from '@/api/user'

export const useUserStore = defineStore({
  id: 'six-user',
  state: () => ({
    token: localStorage.getItem('token'),
    userInfo: {},
    roles: [],
  }),
  getters: {},
  actions: {
    // 获取token
    async getToken(params) {
      console.log('getToken', params)
      try {
        const { username, password = '' } = params
        const { data } = await tokenApi({ username: username.trim(), password })
        console.log(data)
        const { token } = data
        // const Authorization = `bearer ${token}`
        this.token = token
        localStorage.setItem('token', token)
      } catch (error) {
        return Promise.reject(error)
      }
    },

    // 用户权限
    async getRoleList() {
      const { data } = await rulesApi({ token: this.token })
      console.log(data)
      this.roles = data
      return data
    },

    // 用户信息
    async getUserInfo() {
      const { data } = await userInfoApi({ token: this.token })
      this.userInfo = data
    },

    // 退出登陆
    async exitSystem(quick = false, message = '退出登陆成功！') {
      let loadingInstance
      try {
        if (quick !== true) {
          await ElMessageBox.confirm('确定要退出登陆吗？', '提示', {
            type: 'warning',
          })
          loadingInstance = ElLoading.service({
            lock: true,
            text: '退出登录中...',
            spinner: 'el-icon-loading',
          })
        }

        await logoutApi() // 退出登陆接口
        this.clearUserInfo()
        await router.push('/login')
        ElNotification.success({
          title: '提示',
          message,
        })
      } catch (err) {
        console.log(err, '退出取消或失败')
      } finally {
        loadingInstance.close()
      }
    },

    // 清空信息
    clearUserInfo() {
      // 根据权限处理路由
      const menuStore = useMenuStore()
      menuStore.removeRoutes.forEach((removeRoute) => removeRoute())
      menuStore.$reset()
      localStorage.removeItem('token')
      this.$reset()
    },
  },
})

export function useUserStoreWithOut() {
  return useUserStore(stores)
}
