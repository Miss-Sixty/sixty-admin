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

//新增
export function add(params) {
  return request.get('/mock/list/add', { params }).then(res => res.data)
}

//修改
export function edit(params) {
  return request.get('/mock/list/edit', { params }).then(res => res.data)
}

//禁用/启用
export function status(params) {
  return request.get('/mock/list/status', { params }).then(res => res.data)
}
