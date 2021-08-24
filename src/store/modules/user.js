import { login, info, notice, logout, permissions, upDateInfo } from '@/api/user'
import { encrypt, decrypt } from '@/utils/secret'

const state = {
  userInfo: localStorage.userInfo || '',
  token: localStorage.token || '',
  notice: {},
  roles: [],
}

const actions = {
  login({ commit }, loginForm) {
    const { username, password } = loginForm
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(res => {
          commit('SET_TOKEN', res.data)
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
          commit('USER_DATA', res.data)
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
          commit('USER_NOTICE', res.data)
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
  SET_TOKEN(state, data) {
    localStorage.setItem('token', data.token)
    state.token = data.token
  },

  USER_DATA(state, data) {
    const userInfo = encrypt(data)
    localStorage.setItem('userInfo', userInfo)
    state.userInfo = userInfo
  },

  USER_NOTICE(state, data) {
    state.notice = data
  },

  LOGOUT(state) {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('token')
    state.userInfo = ''
    state.token = ''
    state.notice = {}
    state.roles = []
  },

  SETPERMISSIONS(state, roles) {
    state.roles = roles
  },
}

const getters = {
  isLogin: state => {
    if (state.token) return true
  },
  userInfo: state => {
    const { userInfo } = state
    if (!userInfo) return ''
    try {
      return decrypt(userInfo)
    } catch (err) {
      console.error(err)
      return ''
    }
  },
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
}
