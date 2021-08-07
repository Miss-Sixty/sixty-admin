import request from '@/utils/request'

// 列表
export function list(params) {
  return request.get('/mock/list/list', { params }).then(res => res.data)
}

//详情
export function info(params) {
  return request.get('/mock/list/info', { params }).then(res => res.data)
}

//删除
export function del(params) {
  return request.get('/mock/list/del', { params }).then(res => res.data)
}
