import Mock from 'mockjs'

const mockList = Mock.mock({
  'list|0-15': [
    {
      created_at: '@datetime',
      title: '@ctitle',
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
    url: '/mock/noticeType/list',
    method: 'get',
    response: list,
  },
  {
    url: '/mock/noticeType/add',
    method: 'post',
    response: success('新增'),
  },
  {
    url: '/mock/noticeType/edit',
    method: 'put',
    response: success('修改'),
  },
  {
    url: '/mock/noticeType/del',
    method: 'delete',
    response: success('删除'),
  },
  {
    url: '/mock/noticeType/info',
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
        id: '@id',
        type_id: '@id',
      },
    },
  },
]
