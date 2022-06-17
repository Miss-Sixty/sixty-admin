const userToken = {
  admin: {
    token: 'admin',
  },
  editor: {
    token: 'editor',
  },
}

const rules = {
  admin: ['permission.browse', 'permission.create', 'permission.edit', 'permission.remove'],
  editor: ['permission.browse'],
}

const userInfo = {
  admin: {
    name: '张三丰',
    job: '技术部总监',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    failure_time: Date.parse(new Date()) + 50000,
    phone: '18288888888',
    gender: '男',
    nickname: 'MissSixty',
    company: '杭州xxx技术有限公司',
  },
  editor: {
    name: '张小五',
    job: '营销部编辑',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    failure_time: Date.parse(new Date()) + 50000,
    phone: '18266666666',
    gender: '女',
    nickname: '四五六',
    company: '青岛xxx有限公司',
  },
}

// const notice = {
//   status: 200,
//   message: 'success',
//   data: {
//     'num|0-10': 10,
//     list: [
//       {
//         title: '通知',
//         name: '0',
//         'num|0-10': 10,
//         list: [
//           {
//             text: '@cparagraph(1, 3)',
//             icon: 'xiongmao-icon',
//             color: '#409EFF',
//             id: 1,
//             time: '@datetime',
//           },
//           {
//             text: '@cparagraph(1, 3)',
//             icon: 'ciwei-icon',
//             color: '#67C23A',
//             id: 23,
//             time: '@datetime',
//           },
//           {
//             text: '@cparagraph(1, 3)',
//             icon: 'daxiang-icon',
//             color: '#E6A23C',
//             id: 3,
//             time: '@datetime',
//           },
//           {
//             text: '@cparagraph(1, 3)',
//             icon: 'gongji-icon',
//             color: '#909399',
//             id: 4,
//             time: '@datetime',
//           },
//           {
//             text: '@cparagraph(1, 3)',
//             icon: 'lang-icon',
//             color: '#F56C6C',
//             id: 5,
//             time: '@datetime',
//           },
//         ],
//       },
//       {
//         title: '消息',
//         name: '1',
//         num: 0,
//         list: [],
//       },
//       {
//         title: '待办',
//         name: '2',
//         'num|0-10': 10,
//         list: [
//           {
//             text: '@cparagraph(1, 3)',
//             icon: 'zhu-icon',
//             color: '#409EFF',
//             id: 1,
//             time: '@datetime',
//           },
//           {
//             text: '@cparagraph(1, 3)',
//             icon: 'xiaoji-icon',
//             color: '#67C23A',
//             id: 23,
//             time: '@datetime',
//           },
//         ],
//       },
//     ],
//   },
// }

// const rules = {
//   admin: ['permission.browse', 'permission.create', 'permission.edit', 'permission.remove'],
//   editor: ['permission.browse'],
// }

export default [
  {
    url: '/mock/user/token',
    method: 'post',
    timeout: 500,
    response: ({ body }) => {
      const token = userToken[body.username]
      return token
        ? {
            statusCode: 200,
            message: '登陆成功！',
            data: token,
          }
        : {
            statusCode: 500,
            message: '帐号或密码不正确',
            data: '',
          }
    },
  },

  {
    url: '/mock/user/rules',
    method: 'get',
    timeout: 500,
    response: ({ query }) => {
      return {
        statusCode: 200,
        message: 'success',
        data: rules[query.token],
      }
    },
  },

  {
    url: '/mock/user/logout',
    method: 'post',
    timeout: 1500,
    response: () => {
      return {
        statusCode: 200,
        message: '退出成功！',
        data: {},
      }
    },
  },

  {
    url: '/mock/user/info',
    method: 'get',
    timeout: 1500,
    response: ({ query }) => {
      const info = userInfo[query.token]
      return info
        ? {
          statusCode: 200,
            message: 'success',
            data: userInfo[query.token],
          }
        : {
          statusCode: 404,
            message: '未找到用户信息！',
            data: {},
          }
    },
  },

  // {
  //   url: '/mock/user/notice',
  //   method: 'get',
  //   response: () => {
  //     return {
  //       status: 200,
  //       message: 'success',
  //       data: notice,
  //     }
  //   },
  // },

  // {
  //   url: '/mock/user/upDateInfo',
  //   method: 'get',
  //   response: () => {
  //     return {
  //       status: 200,
  //       message: '更新成功！',
  //       data: {},
  //     }
  //   },
  // },
]
