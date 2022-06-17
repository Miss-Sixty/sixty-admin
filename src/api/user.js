import request from '@/utils/request'

// 获取token
export function tokenApi(data) {
  return request({
    url: '/mock/user/token',
    method: 'post',
    data,
  }).then((res) => res.data)
}

// 管理员权限
export function rulesApi(params) {
  return request({
    url: '/mock/user/rules',
    method: 'get',
    params,
  }).then((res) => res.data)
}

// 退出登录
export function logoutApi(data) {
  return request({
    url: '/mock/user/logout',
    method: 'post',
    data,
  }).then((res) => res.data)
}

// 用户信息
export function userInfoApi(params) {
  return request({
    url: '/mock/user/info',
    params,
  }).then((res) => res.data)
}
