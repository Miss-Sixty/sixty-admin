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
    avatar: 'https://sixty-admin.oss-cn-hangzhou.aliyuncs.com/avatar.jpg',
    failure_time: Date.parse(new Date()) + 50000,
    phone: '18288888888',
    gender: 1,
    nickname: 'MissSixty',
    bio: '@cparagraph',
    company: '杭州xxx技术有限公司',
  },
  editor: {
    name: '张小五',
    jobTitle: '营销部编辑',
    avatar: 'https://sixty-admin.oss-cn-hangzhou.aliyuncs.com/avatar.jpg',
    failure_time: Date.parse(new Date()) + 50000,
    phone: '18266666666',
    gender: 2,
    nickname: '四五六',
    bio: '@cparagraph',
    company: '青岛xxx有限公司',
  },
}

const notice = {
  status: 200,
  message: 'success',
  data: {
    'num|0-10': 10,
    list: [
      {
        title: '通知',
        name: '0',
        'num|0-10': 10,
        list: [
          {
            text: '@cparagraph(1, 3)',
            icon: 'Xiongmao',
            color: '#409EFF',
            id: 1,
            time: '@datetime',
          },
          {
            text: '@cparagraph(1, 3)',
            icon: 'Ciwei',
            color: '#67C23A',
            id: 23,
            time: '@datetime',
          },
          {
            text: '@cparagraph(1, 3)',
            icon: 'Daxiang',
            color: '#E6A23C',
            id: 3,
            time: '@datetime',
          },
          {
            text: '@cparagraph(1, 3)',
            icon: 'Gongji',
            color: '#909399',
            id: 4,
            time: '@datetime',
          },
          {
            text: '@cparagraph(1, 3)',
            icon: 'Lang',
            color: '#F56C6C',
            id: 5,
            time: '@datetime',
          },
        ],
      },
      {
        title: '消息',
        name: '1',
        num: 0,
        list: [],
      },
      {
        title: '待办',
        name: '2',
        'num|0-10': 10,
        list: [
          {
            text: '@cparagraph(1, 3)',
            icon: 'Zhu',
            color: '#409EFF',
            id: 1,
            time: '@datetime',
          },
          {
            text: '@cparagraph(1, 3)',
            icon: 'Xiaoji',
            color: '#67C23A',
            id: 23,
            time: '@datetime',
          },
        ],
      },
    ],
  },
}

const rules = {
  admin: ['permission.browse', 'permission.create', 'permission.edit', 'permission.remove'],
  editor: ['permission.browse'],
}

export default [
  {
    url: '/mock/user/token',
    method: 'post',
    response: option => {
      const token = userToken[option.body.username]

      return token
        ? {
            status: 200,
            message: 'success',
            data: token,
          }
        : {
            status: 500,
            message: '帐号和密码不正确',
          }
    },
  },

  {
    url: '/mock/user/info',
    method: 'get',
    response: option => {
      const info = userInfo[option.query.token]
      return info
        ? {
            status: 200,
            message: 'success',
            data: userInfo[option.query.token],
          }
        : {
            status: 40001,
            message: '未找到用户信息！',
            data: {},
          }
    },
  },

  {
    url: '/mock/user/notice',
    method: 'get',
    response: () => {
      return {
        status: 200,
        message: 'success',
        data: notice,
      }
    },
  },

  {
    url: '/mock/user/rules',
    method: 'get',
    response: option => {
      return {
        status: 200,
        message: 'success',
        data: rules[option.query.token],
      }
    },
  },

  {
    url: '/mock/user/upDateInfo',
    method: 'get',
    response: () => {
      return {
        status: 200,
        message: '更新成功！',
        data: {},
      }
    },
  },
  {
    url: '/mock/user/logout',
    method: 'post',
    response: () => {
      return {
        status: 200,
        message: '退出成功！',
        data: {},
      }
    },
  },
]
