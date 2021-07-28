import { unref } from 'vue'
/**
 * 存放全局公用状态
 */
import setting from '@/setting'
const state = {
  ...setting,
  title: setting.title || '', // 页面标题
  mode: 'pc',
}

const mutations = {
  // 设置网页标题
  SETTITLE(state, title) {
    state.title = title
  },

  // 切换侧边栏导航展开/收起
  TOOGLE_SIDEBAR_COLLAPSE(state) {
    state.sidebarCollapse = !state.sidebarCollapse
  },

  // 设置访问模式，页面宽度小于 992px 时切换为移动端展示
  SET_MODE(state, width) {
    const mode = ['phone', 'pad', 'pc']
    const unWidth = unref(width)
    state.mode = unWidth <= 768 ? mode[0] : unWidth <= 992 ? mode[1] : mode[2]
    if (state.mode !== 'pc') state.sidebarCollapse = true
    else state.sidebarCollapse = false
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
