import { defineStore } from 'pinia'
import setting from '@/setting'
import stores from '@/stores'
import { useStorage, useMediaQuery } from '@vueuse/core'

export const useSettingsStore = defineStore({
  id: 'six-setting',
  state: () => ({
    ...setting,
    _collapse: useStorage('collapse', setting.sidebar.subMenuCollapse), // 缓存pc端导航收起还是展开
    _mode: useMediaQuery('(min-width: 990px)'),
  }),
  getters: {
    // 显示模式，支持：mobile、pc
    mode: (state) => {
      return state._mode ? 'pc' : 'mobile'
    },
    collapse: (state) => {
      return state._mode ? state._collapse : false
    },
  },
  actions: {
    // 切换侧边栏导航展开/收起
    setCollapse() {
      if (this.mode === 'pc') this._collapse = !this._collapse
      else this.sidebar.subMenuCollapse = !this.sidebar.subMenuCollapse
    },
  },
})

export function useSettingStoreWithOut() {
  return useSettingsStore(stores)
}
