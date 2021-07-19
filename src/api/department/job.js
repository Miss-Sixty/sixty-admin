import request from '@/utils/request'

// 列表
export function job(params) {
  return request.get('/mock/job/list', { params }).then(res => res.data)
}

// 新增
export function jobAdd(params) {
  return request.get('/mock/job/add', { params }).then(res => res.data)
}

// 修改
export function jobEdit(params) {
  return request.get('/mock/job/edit', { params }).then(res => res.data)
}

// 禁用
export function jobSwitch(params) {
  return request.get('/mock/job/switch', { params }).then(res => res.data)
}

// 删除
export function jobDel(params) {
  return request.get('/mock/job/del', { params }).then(res => res.data)
}
