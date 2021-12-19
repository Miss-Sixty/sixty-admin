import Mock from 'mockjs'
// 拓展mockjs
Mock.Random.extend({
  phone: function() {
    var phonePrefixs = ['132', '135', '189'] //
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) // Number()
  }
})

const mockList = Mock.mock({
  'list|0-15': [
    {
      id: '@id',
      name: '@cname',
      date: '@datetime',
      status: '@boolean',
      address: '@county(true)'
    }
  ]
})

const data = {
  status: 200,
  message: 'success',
  data: {
    list: mockList.list,
    paginate: {
      current_page: 1,
      total: mockList.list.length,
      page_size: 15
    }
  }
}

const info = {
  status: 200,
  message: 'success',
  data: {
    name: '@cname',
    status: '@boolean',
    address: '@county(true)',
    phone: '@phone'
  }
}

const success = text => ({
  status: 200,
  message: `${text}成功`,
  data: {}
})

export default [
  {
    url: '/mock/list/list',
    response: () => data
  },
  {
    url: '/mock/list/info',
    response: () => info
  },
  {
    url: '/mock/list/add',
    response: () => success('新增')
  },
  {
    url: '/mock/list/edit',
    response: () => success('修改')
  },
  {
    url: '/mock/list/status',
    response: () => success('更改')
  },
  {
    url: '/mock/list/del',
    response: () => success('删除')
  }
]
