import request from '@/utils/request'

// 获取token
export function token(data) {
  return request({
    url: '/mock/user/token',
    method: 'post',
    data,
  }).then(res => res.data)
}

// 管理员权限
export function rules(params) {
  return request.get('/mock/user/rules', { params }).then(res => res.data)
}

// 用户通知
export function notice() {
  return request.get('/mock/user/notice').then(res => res.data)
}

// 用户信息
export function info(params) {
  return request({
    url: '/mock/user/info',
    params,
  }).then(res => res.data)
}

// 更新用户信息
export function upDateInfo(params) {
  return request.get('/mock/user/upDateInfo', { params }).then(res => res.data)
}

// // 后台-管理员退出登录
// export function logout() {
//   return request.post('/mock/user/logout').then(res => res.data)
// }

// // tagview
// export function tagview(params) {
//   return request.get('/mock/user/tagview', { params }).then(res => res.data)
// }
