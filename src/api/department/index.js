import request from '@/utils/request'

// 部门列表
export function department(params) {
  return request.get('/mock/department/list', { params }).then(res => res.data)
}

// 部门新增
export function departmentAdd(params) {
  return request.get('/mock/department/add', { params }).then(res => res.data)
}

// 部门修改
export function departmentEdit(params) {
  return request.get('/mock/department/edit', { params }).then(res => res.data)
}

// 部门禁用
export function departmentSwitch(params) {
  return request.get('/mock/department/switch', { params }).then(res => res.data)
}

// 部门删除
export function departmentDel(params) {
  return request.get('/mock/department/del', { params }).then(res => res.data)
}
