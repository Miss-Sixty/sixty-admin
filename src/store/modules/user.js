import { defineStore } from 'pinia'
import { token, rules, notice, info, upDateInfo } from '@/api/user'
import { encrypt, decrypt } from '@/utils/secret'
import { useMenuStore } from './menu'
import store from '@/store'

export const useUserStore = defineStore('user-store', {
  state: () => ({
    _userInfo: localStorage.getItem('userInfo'),
    token: localStorage.getItem('token'),
    notice: {},
    roles: [],
  }),
  getters: {
    userInfo() {
      return decrypt(this._userInfo)
    },
  },
  actions: {
    //获取token
    async getToken(params) {
      try {
        const { username, password = '' } = params
        const { data } = await token({ username: username.trim(), password })
        this.token = data.token
        localStorage.setItem('token', data.token)

        return await this.getRoleList()
      } catch (error) {
        return Promise.reject(error)
      }
    },

    //用户信息
    async getUserInfo() {
      if (!this.token) return this.clearUserInfo()
      const res = await info({ token: this.token })
      const userInfo = encrypt(res.data)
      localStorage.setItem('userInfo', userInfo)
      this._userInfo = userInfo
    },

    //用户权限
    async getRoleList(currentPath) {
      const { data } = await rules({ token: this.token })
      this.roles = data
      //根据权限处理路由
      const menuStore = useMenuStore()
      await menuStore.generateRoutes(data, currentPath)
    },

    //清空信息
    clearUserInfo() {
      //根据权限处理路由
      const menuStore = useMenuStore()
      menuStore.removeRoutes.forEach(removeRoute => removeRoute())
      menuStore.$reset()

      localStorage.removeItem('userInfo')
      localStorage.removeItem('token')
      this.$reset()
    },

    //获取通知信息
    async getNotice() {
      const { data } = await notice()
      this.notice = data
    },

    //修改用户信息
    editUserInfo(data) {
      return new Promise((resolve, reject) => {
        upDateInfo(data)
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
  },
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
