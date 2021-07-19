import Mock, { Random } from 'mockjs'

const userToken = {
  admin: {
    token: 'admin',
  },
  editor: {
    token: 'editor',
  },
}

const userInfo = {
  admin: {
    name: '张三丰',
    jobTitle: '技术部总监',
    avatar: Random.dataImage('40x40', 'hi'),
    failure_time: Date.parse(new Date()) + 50000,
    phone: '18288888888',
    gender: 1,
    nickname: 'MissSixty',
    bio: Random.cparagraph(),
  },
  editor: {
    name: '张小五',
    jobTitle: '营销部编辑',
    avatar: Random.dataImage('40x40', 'hi'),
    failure_time: Date.parse(new Date()) + 50000,
    phone: '18266666666',
    gender: 2,
    nickname: '四五六',
    bio: Random.cparagraph(),
  },
}

const notice = {
  status: 200,
  message: 'success',
  data: {
    ...Mock.mock({
      'num|0-10': 10,
    }),
    list: [
      {
        title: '通知',
        name: '0',
        ...Mock.mock({
          'num|0-10': 10,
        }),
        list: [
          {
            text: Mock.mock('@cparagraph(1, 3)'),
            id: 1,
          },
          {
            text: Mock.mock('@cparagraph(1, 3)'),
            id: 3,
          },
        ],
      },
      {
        title: '待完成',
        name: '1',
        ...Mock.mock({
          'num|0-10': 10,
        }),
        list: [
          {
            text: Mock.mock('@cparagraph(1, 3)'),
            id: 2,
          },
        ],
      },
      {
        title: '快过期',
        name: '2',
        num: 0,
        list: [],
      },
    ],
  },
}

const permissions = {
  admin: ['permission.browse', 'permission.create', 'permission.edit', 'permission.remove'],
  editor: ['permission.browse'],
}
export default {
  'get|/mock/user/notice': notice,
  'get|/mock/user/upDateInfo': {
    status: 200,
    message: '更新成功！',
    data: {},
  },
  'post|/mock/user/logout': {
    status: 200,
    message: '退出成功',
    data: {},
  },
  'get|/mock/user/login': option => {
    const token = userToken[option.query.username]
    if (!token) {
      return {
        status: 500,
        message: '帐号和密码不正确',
      }
    }

    return {
      status: 200,
      message: 'success',
      data: userToken[option.query.username],
    }
  },

  'get|/mock/user/info': option => {
    return {
      status: 200,
      message: 'success',
      data: userInfo[option.query.token],
    }
  },

  'get|/mock/user/permissions': option => {
    return {
      status: 200,
      message: 'success',
      data: permissions[option.query.token],
    }
  },

  'get|/mock/user/tagview': () => {
    return {
      status: 200,
      message: 'success',
      data: ['Home', 'Report'],
    }
  },
}
