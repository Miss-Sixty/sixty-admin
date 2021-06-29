// import api from '@/api'
// import { login, logout, adminInfo } from "@/api/user";

const state = {
  token: localStorage.token || "",
  failure_time: localStorage.failure_time || "",
  permissions: [],
};

const getters = {
  isLogin: (state) => {
    let retn = false;
    if (state.token) {
      let unix = Date.parse(new Date());
      if (unix < state.failure_time * 1000) {
        retn = true;
      }
    }
    return retn;
  },
};

const actions = {
  login() {},
  logout() {},
  // 获取我的权限
  getPermissions() {},
};

const mutations = {
  setUserData() {},
  removeUserData() {},
  setPermissions() {},
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
