import Mock from 'mockjs'

const mockList = Mock.mock({
  'list|0-15': [
    {
      name: '@cname',
      date: '@datetime',
      status: '@boolean',
      address: '@county(true)',
    },
  ],
})

const data = {
  status: 200,
  message: 'success',
  data: {
    list: mockList.list,
    current_page: 1,
    total: mockList.list.length,
  },
}

export default {
  'get|/mock/list': data,
}
