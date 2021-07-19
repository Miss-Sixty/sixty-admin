import { login, info, notice, logout, permissions, upDateInfo } from '@/api/user'

const state = {
  userInfo: localStorage.userInfo ? JSON.parse(localStorage.userInfo) : '',
  token: localStorage.token || '',
  failure_time: localStorage.failure_time || '',
  notice: {},
  roles: [],
}

const actions = {
  login({ commit }, loginForm) {
    const { username, password } = loginForm
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(res => {
          commit('SETTOKEN', res.data)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  getUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      info({ token: state.token })
        .then(res => {
          commit('USERDATA', res.data)
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  //更新信息
  upDateUserInfo({ state }) {
    return new Promise((resolve, reject) => {
      upDateInfo(state)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  //获取通知信息
  getNotice({ commit }) {
    return new Promise((resolve, reject) => {
      notice()
        .then(res => {
          commit('USERNOTICE', res.data)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  // 退出登录
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit('LOGOUT')
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  // 获取权限
  permissions({ commit }) {
    return new Promise((resolve, reject) => {
      permissions({ token: state.token })
        .then(res => {
          commit('SETPERMISSIONS', res.data)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
}

const mutations = {
  SETTOKEN(state, data) {
    localStorage.setItem('token', data.token)
    state.token = data.token
  },

  USERDATA(state, data) {
    localStorage.setItem('userInfo', JSON.stringify(data))
    localStorage.setItem('failure_time', data.failure_time)
    state.userInfo = data
    state.failure_time = data.failure_time
  },

  USERNOTICE(state, data) {
    state.notice = data
  },

  LOGOUT(state) {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('token')
    localStorage.removeItem('failure_time')
    state.userInfo = {}
    state.token = ''
    state.failure_time = ''
    state.notice = {}
    state.roles = []
  },

  SETPERMISSIONS(state, roles) {
    state.roles = roles
  },
}

const getters = {
  isLogin: state => {
    if (!state.token) return
    const unix = Date.parse(new Date())
    return !!(unix < state.failure_time * 1000)
  },
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
}
