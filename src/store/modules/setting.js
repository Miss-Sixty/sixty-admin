import setting from '@/setting'
import { defineStore } from 'pinia'
import store from '@/store'
import { useStorage, useMediaQuery } from '@vueuse/core'
import { useMenuStore } from './menu'

export const useSettingStore = defineStore('setting-store', {
  state: () => ({
    ...setting,
    title: import.meta.env.VITE_APP_TITLE || '', // 项目标题
    collapse: useStorage('collapse', useMediaQuery('(min-width: 1000px) and (max-width: 1200px)')),
    isPhone: useMediaQuery('(max-width: 999px)'),
    updateTime: __UPDATE_TIME__ || '未知',
    maximize: false, //main是否全屏
  }),
  getters: {
    alwaysShowMainSidebar() {
      return this.alwaysShowMainSidebar || useMenuStore().allRoutes.length > 1
    },
  },
  actions: {
    // 设置网页标题
    setTitle(state, title) {
      state.title = title
    },

    // 切换侧边栏导航展开/收起
    setCollapse() {
      this.collapse = !this.collapse
    },

    fullScreen() {
      this.maximize = !this.maximize
    },
  },
})

// Need to be used outside the setup
export function useSettingStoreWithOut() {
  return useSettingStore(store)
}
