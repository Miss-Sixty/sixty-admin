import request from '@/utils/request'

// 列表
export function list(params) {
  return request({
    url: '/mock/noticeType/list',
    params,
  }).then(res => res.data)
}

// 新增
export function add(data) {
  return request({
    url: '/mock/noticeType/add',
    method: 'post',
    data,
  }).then(res => res.data)
}

// 修改
export function edit(data) {
  return request({
    url: '/mock/noticeType/edit',
    method: 'put',
    data,
  }).then(res => res.data)
}

// 删除通知类型
export function del() {
  return request({
    url: '/mock/noticeType/del',
    method: 'delete',
  }).then(res => res.data)
}

// 查看通知类型详情
export function info() {
  return request({
    url: '/mock/noticeType/info',
  }).then(res => res.data)
}
