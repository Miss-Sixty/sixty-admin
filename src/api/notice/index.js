import request from '@/utils/request'

// 列表
export function list(params) {
  return request({
    url: '/mock/notice/list',
    params,
  }).then(res => res.data)
}

// 新增
export function add(data) {
  return request({
    url: '/mock/notice/add',
    method: 'post',
    data,
  }).then(res => res.data)
}

// 更新
export function edit(data) {
  return request({
    url: '/mock/notice/edit',
    method: 'put',
    data,
  }).then(res => res.data)
}

// 删除
export function del() {
  return request({
    url: '/mock/notice/del',
    method: 'delete',
  }).then(res => res.data)
}

// 查看
export function info() {
  return request({
    url: '/mock/notice/info',
  }).then(res => res.data)
}
