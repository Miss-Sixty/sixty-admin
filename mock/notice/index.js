import Mock from 'mockjs'

const mockList = Mock.mock({
  'list|0-15': [
    {
      title: '@ctitle',
      aname: '@cname',
      date: '@datetime',
      text: '@cparagraph(1, 3)',
      type: '@natural(0, 3)',
      status: '@natural(0, 1)',
      id: '@id',
    },
  ],
})

const list = {
  status: 200,
  message: 'success',
  data: {
    list: mockList.list,
    current_page: 1,
    total: mockList.list.length,
  },
}

const success = text => ({
  status: 200,
  message: `${text}成功`,
  data: {},
})

export default [
  {
    url: '/mock/notice/list',
    method: 'get',
    response: list,
  },
  {
    url: '/mock/notice/add',
    method: 'post',
    response: success('新增'),
  },
  {
    url: '/mock/notice/edit',
    method: 'put',
    response: success('修改'),
  },
  {
    url: '/mock/notice/del',
    method: 'delete',
    response: success('删除'),
  },
  {
    url: '/mock/notice/info',
    method: 'get',
    response: {
      status: 200,
      message: 'success',
      data: {
        title: '@ctitle',
        aname: '@cname',
        date: '@datetime',
        text: '@cparagraph(1, 3)',
        type: '@natural(0, 3)',
        status: '@natural(0, 1)',
      },
    },
  },
]
