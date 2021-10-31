import { defineStore } from 'pinia'
import Push from 'push.js'
import store from '@/store'
import { ElMessage } from 'element-plus'

export const useAppStore = defineStore('app-store', {
  state: () => ({
    dot: true,
    number: 10,
    text: '热门',
    permissionType: Push.Permission.get(), // default-未获得权限 granted-已获得权限 denied-已拒绝权限
  }),
  actions: {
    //请求通知权限
    getPermission() {
      console.log(1212)
      console.log(this.permissionType)

      if (this.permissionType !== 'default') return
      const type = () => {
        this.permissionType = Push.Permission.get()
      }
      //frunction(有权限，无权限)
      return Push.Permission.request(type, type)
    },

    //通知内容
    notification({ title = '系统通知', body, icon }) {
      if (this.permissionType === 'denied') return ElMessage.error('无通知权限，请在浏览器设置中开启权限。')
      Push.create(title, {
        body,
        icon,
        timeout: 8000,
        onClick: function () {
          router.push({ name: 'Notice' })
          window.focus()
          this.close()
        },
      }).catch(err => {
        console.log(err)
        this.getPermission()
      })
    },

    clearNotification() {
      return Push.clear()
    },
  },
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store)
}
