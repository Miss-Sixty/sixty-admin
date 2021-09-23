import Mock from 'mockjs'
// 拓展mockjs
Mock.Random.extend({
  phone: function () {
    var phonePrefixs = ['132', '135', '189'] //
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()
  },
})

const mockList = Mock.mock({
  'list|0-15': [
    {
      id: '@integer(10000)',
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

const info = {
  status: 200,
  message: 'success',
  data: {
    name: '@cname',
    status: '@boolean',
    address: '@county(true)',
    phone: '@phone',
  },
}

const success = text => ({
  status: 200,
  message: `${text}成功`,
  data: {},
})

export default {
  'get|/mock/list/list': data,
  'get|/mock/list/info': info,
  'get|/mock/list/add': success('新增'),
  'get|/mock/list/edit': success('修改'),
  'get|/mock/list/status': success('更改'),
  'get|/mock/list/del': success('删除'),
}
