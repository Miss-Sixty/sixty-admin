/**
 * 存放全局公用状态
 */
import setting from "@/setting";
const state = {
  ...setting,
  title: setting.title || "", // 页面标题
};

const mutations = {
  // 设置网页标题
  SETTITLE(state, title) {
    state.title = title;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
