import Mock, { Random } from "mockjs";
const userToken = {
  status: 200,
  message: "success",
  data: {
    token: Mock.mock("@guid"),
  },
};

const userInfo = {
  status: 200,
  message: "success",
  data: {
    name: Mock.mock("@cname"),
    jobTitle: Mock.mock("@cword(2, 5)"),
    avatar: Random.dataImage("40x40", "hi"),
    failure_time: Date.parse(new Date()) + 50000,
  },
};

const notice = {
  status: 200,
  message: "success",
  data: {
    ...Mock.mock({
      "num|0-10": 10,
    }),
    list: [
      {
        title: "通知",
        name: "0",
        ...Mock.mock({
          "num|0-10": 10,
        }),
        list: [
          {
            text: Mock.mock("@cparagraph(1, 3)"),
            id: 1,
          },
          {
            text: Mock.mock("@cparagraph(1, 3)"),
            id: 3,
          },
        ],
      },
      {
        title: "待完成",
        name: "1",
        ...Mock.mock({
          "num|0-10": 10,
        }),
        list: [
          {
            text: Mock.mock("@cparagraph(1, 3)"),
            id: 2,
          },
        ],
      },
      {
        title: "快过期",
        name: "2",
        num: 0,
        list: [],
      },
    ],
  },
};

const logout = {
  status: 200,
  message: "退出成功",
  data: {},
};
export default {
  "get|/mock/user/login": userToken,
  "get|/mock/user/info": userInfo,
  "get|/mock/user/notice": notice,
  "post|/mock/user/logout": logout,

  // 官方解释为：记录用于生成响应数据的函数。当拦截到匹配 rurl 和 rtype 的 Ajax 请求时，函数 function(options) 将被执行，并把执行结果作为响应数据返回。
  //   "get|/mock/user/info": (option) => {
  //     console.log(option);
  //     // 可以在这个地方对demoList2进行一系列操作，例如增删改
  //     // option 指向本次请求的 Ajax 选项集，含有 url、type 和 body 三个属性
  //     return {
  //       status: 200,
  //       message: "success",
  //       data: userInfo,
  //     };
  //   },
};
