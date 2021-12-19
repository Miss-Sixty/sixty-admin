import request from '@/utils/request'

// 列表
export function listApi(params) {
  return request.get('/mock/list/list', { params }).then(res => res.data)
}

// 详情
export function infoApi(params) {
  return request.get('/mock/list/info', { params }).then(res => res.data)
}

// 删除
export function delApi(params) {
  return request.get('/mock/list/del', { params }).then(res => res.data)
}

// 新增
export function addApi(params) {
  return request.get('/mock/list/add', { params }).then(res => res.data)
}

// 修改
export function editApi(params) {
  return request.get('/mock/list/edit', { params }).then(res => res.data)
}

// 禁用/启用
export function statusApi(params) {
  return request.get('/mock/list/status', { params }).then(res => res.data)
}
