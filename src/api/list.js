import request from '@/utils/request'

// 列表
export function list(params) {
  return request.get('/mock/list', { params }).then(res => res.data)
}
