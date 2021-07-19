// import Mock from "mockjs";

const listData = [
  {
    name: '前端开发',
    id: 0,
    status: 1,
  },
  {
    name: '后端开发',
    id: 1,
    status: 1,
  },
  {
    name: '测试',
    id: 2,
    status: 0,
  },
  {
    name: '设计',
    id: 3,
    status: 1,
  },
  {
    name: '技术经理',
    id: 4,
    status: 0,
  },
]

const data = {
  status: 200,
  message: 'success',
  data: {
    list: listData,
    current_page: 1,
    total: listData.length,
  },
}

const success = text => ({
  status: 200,
  message: `${text}成功`,
  data: {},
})

export default {
  'get|/mock/job/list': data,
  'get|/mock/job/add': success('新增'),
  'get|/mock/job/edit': success('修改'),
  'get|/mock/job/switch': success('更改'),
  'get|/mock/job/del': success('删除'),
}
