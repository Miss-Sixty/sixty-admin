// import api from '@/api'
import {
  login,
  info,
  notice,
  logout,
  // logout, adminInfo
} from "@/api/user";

const state = {
  userInfo: localStorage.userInfo ? JSON.parse(localStorage.userInfo) : "",
  token: localStorage.token || "",
  failure_time: localStorage.failure_time || "",
  notice: {},
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
  login(state, loginForm) {
    const { username, password } = loginForm;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then((res) => {
          console.log(res);
          localStorage.setItem("SixtyToken", res.data.token);
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      info()
        .then((res) => {
          console.log(res);
          commit("USERDATA", res.data);
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  //获取通知信息
  getNotice({ commit }) {
    return new Promise((resolve, reject) => {
      notice()
        .then((res) => {
          commit("USERNOTICE", res.data);
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // 退出登录
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit("LOGOUT");
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // 获取我的权限
  getPermissions() {},
};

const mutations = {
  USERDATA(state, data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
    localStorage.setItem("failure_time", data.failure_time);
    state.userInfo = data;
    state.failure_time = data.failure_time;
  },

  USERNOTICE(state, data) {
    state.notice = data;
  },

  LOGOUT() {
    console.log(22);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("SixtyToken");
    localStorage.removeItem("failure_time");
    state.userInfo = {};
    state.token = "";
    state.failure_time = "";
    state.notice = {};
  },
  setPermissions() {},
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
