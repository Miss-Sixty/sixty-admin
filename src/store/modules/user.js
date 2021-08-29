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
        .catch(err => reject(err))
    })
  },

  getUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      info({ token: state.token })
        .then(res => {
          commit('SET_USER_INFO', res.data)
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
          commit('CLEAR_USER_INFO')
        })
    })
  },

  //修改用户信息
  editUserInfo({ state }) {
    return new Promise((resolve, reject) => {
      upDateInfo(state)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  },

  //获取通知信息
  getNotice({ commit }) {
    return new Promise((resolve, reject) => {
      notice()
        .then(res => {
          commit('SET_USER_NOTICE', res.data)
          resolve()
        })
        .catch(err => reject(err))
    })
  },

  // 退出登录
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit('CLEAR_USER_INFO')
          resolve()
        })
        .catch(err => reject(err))
    })
  },

  // 获取权限
  permissions({ commit }) {
    return new Promise((resolve, reject) => {
      permissions({ token: state.token })
        .then(res => {
          commit('SETP_ERMISSIONS', res.data)
          resolve(res)
        })
        .catch(err => reject(err))
    })
  },
}

const mutations = {
  SET_TOKEN(state, data) {
    localStorage.setItem('token', data.token)
    state.token = data.token
  },

  SET_USER_INFO(state, data) {
    const userInfo = encrypt(data)
    localStorage.setItem('userInfo', userInfo)
    state.userInfo = userInfo
  },

  SET_USER_NOTICE(state, data) {
    state.notice = data
  },

  CLEAR_USER_INFO(state) {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('token')
    state.userInfo = ''
    state.token = ''
    state.notice = {}
    state.roles = []
  },

  SETP_ERMISSIONS(state, roles) {
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
