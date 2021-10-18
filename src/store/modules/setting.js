import setting from '@/setting'
import { defineStore } from 'pinia'
import { unref } from 'vue'
import store from '@/store'
import { useStorage } from '@vueuse/core'

export const useSettingStore = defineStore('setting-store', {
  state: () => ({
    ...setting,
    title: import.meta.env.VITE_APP_TITLE || '', // 项目标题
    mode: 'pc',
    collapse: useStorage('collapse', false),
    updateTime: __UPDATE_TIME__ || '未知',
    maximize: false, //main是否全屏
  }),
  actions: {
    // 设置网页标题
    setTitle(state, title) {
      state.title = title
    },

    // 切换侧边栏导航展开/收起
    setCollapse() {
      this.collapse = !this.collapse
    },

    // 设置访问模式，页面宽度小于 992px 时切换为移动端展示
    setMode(width) {
      const mode = ['phone', 'pad', 'pc']
      const unWidth = unref(width)
      this.mode = unWidth <= 768 ? mode[0] : unWidth <= 992 ? mode[1] : mode[2]
      if (this.mode !== 'pc') this.sidebarCollapse = true
      else this.sidebarCollapse = false
    },

    fullScreen() {
      const getIsUnFold = !this.menuSetting.show && !this.headerSetting.show
      this.menuSetting.show = getIsUnFold
      this.headerSetting.show = getIsUnFold
      this.maximize = !getIsUnFold
    },
  },
})

// Need to be used outside the setup
export function useSettingStoreWithOut() {
  return useSettingStore(store)
}
