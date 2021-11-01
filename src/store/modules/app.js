import { defineStore } from 'pinia'
import Push from 'push.js'
import store from '@/store'
import { ElMessage } from 'element-plus'
import audioUrl from '@/assets/notification.ogg'
import serviceWorker from '/OneSignalSDKWorker.js'

Push.config({
  serviceWorker, // Sets a custom service worker script
  fallback: function (payload) {
    console.log(payload)
  },
})

export const useAppStore = defineStore('app-store', {
  state: () => ({
    dot: true,
    number: 10,
    text: '热门',
    permissionType: Push.Permission.get(), // default-未获得权限 granted-已获得权限 denied-已拒绝权限
    audio: null, //音频dom
  }),
  actions: {
    //请求通知权限
    getPermission() {
      if (this.permissionType !== 'default') return
      const type = () => {
        this.permissionType = Push.Permission.get()
      }
      //frunction(有权限，无权限)
      return Push.Permission.request(type, type)
    },

    //通知内容
    notification(title, setting, onClick) {
      if (this.permissionType === 'denied') return ElMessage.error('无通知权限，请在浏览器设置中开启权限。')
      Push.create(title || '系统通知', {
        // ...setting,
        timeout: 8000,
        onClick,
      })
        .then(() => this.playNotificationAudio())
        .catch(err => {
          console.log(err)
          this.getPermission()
        })
    },

    clearNotification() {
      return Push.clear()
    },

    playNotificationAudio() {
      if (this.audio) return this.audio.play()
      this.audio = new Audio(audioUrl)
      this.audio.play()
    },
  },
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store)
}
