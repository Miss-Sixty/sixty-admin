import Mock from 'mockjs'

const mockList = Mock.mock({
  'list|0-15': [
    {
      title: '@ctitle',
      name: '@cname',
      date: '@datetime',
      id: '@id',
    },
  ],
})

const list = {
  status: 200,
  message: 'success',
  data: {
    list: mockList.list,
    paginate: {
      current_page: 1,
      page_size: 10,
      total: mockList.list.length,
    },
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
        is_operate: true,
        id: '@id',
        title: '@ctitle',
        name: '@cname',
        date: '@datetime',
        content: [
          {
            type: 'table',
            children: [
              {
                type: 'table-row',
                children: [
                  { type: 'table-cell', children: [{ text: '测试' }] },
                  { type: 'table-cell', children: [{ text: '测试' }] },
                  { type: 'table-cell', children: [{ text: '测试' }] },
                  { type: 'table-cell', children: [{ text: '测试' }] },
                ],
              },
              {
                type: 'table-row',
                children: [
                  { type: 'table-cell', children: [{ text: '测试' }] },
                  { type: 'table-cell', children: [{ text: '测试' }] },
                  { type: 'table-cell', children: [{ text: '测试' }] },
                  { type: 'table-cell', children: [{ text: '测试' }] },
                ],
              },
            ],
            withHeader: true,
          },
        ],
      },
    },
  },
]
