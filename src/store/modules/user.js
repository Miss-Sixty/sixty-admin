// import api from '@/api'
import { login, info, notice, logout, permissions } from "@/api/user";

const state = {
  userInfo: localStorage.userInfo ? JSON.parse(localStorage.userInfo) : "",
  token: localStorage.token || "",
  failure_time: localStorage.failure_time || "",
  notice: {},
  roles: [],
};

const actions = {
  login({ commit }, loginForm) {
    const { username, password } = loginForm;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then((res) => {
          commit("SETTOKEN", res.data);
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
          console.log(222);
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

  // 获取权限
  permissions({ commit }) {
    return new Promise((resolve, reject) => {
      permissions()
        .then((res) => {
          commit("SETPERMISSIONS", res);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

const mutations = {
  SETTOKEN(state, data) {
    localStorage.setItem("token", data.token);
    state.token = data.token;
  },

  USERDATA(state, data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
    localStorage.setItem("failure_time", data.failure_time);
    state.userInfo = data;
    state.failure_time = data.failure_time;
  },

  USERNOTICE(state, data) {
    state.notice = data;
  },

  LOGOUT(state) {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    localStorage.removeItem("failure_time");
    state.userInfo = {};
    state.token = "";
    state.failure_time = "";
    state.notice = {};
    state.roles = [];
  },

  SETPERMISSIONS(state, roles) {
    state.roles = roles;
  },
};

const getters = {
  isLogin: (state) => {
    if (!state.token) return;
    const unix = Date.parse(new Date());
    return !!(unix < state.failure_time * 1000);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
