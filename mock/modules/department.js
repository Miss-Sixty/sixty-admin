// import Mock from "mockjs";

const departmentList = [
  {
    name: "技术部",
    id: 0,
    status: 1,
  },
  {
    name: "客服部",
    id: 1,
    status: 1,
  },
  {
    name: "运营部",
    id: 2,
    status: 0,
  },
  {
    name: "人事部",
    id: 3,
    status: 1,
  },
  {
    name: "总助",
    id: 4,
    status: 0,
  },
  {
    name: "行政",
    id: 5,
    status: 1,
  },
];

const department = {
  status: 200,
  message: "success",
  data: {
    list: departmentList,
    current_page: 1,
    total: departmentList.length,
  },
};

const success = (text) => ({
  status: 200,
  message: `${text}成功`,
  data: {},
});

export default {
  "get|/mock/department/list": department,
  "get|/mock/department/add": success("新增"),
  "get|/mock/department/edit": success("修改"),
  "get|/mock/department/switch": success("更改"),
  "get|/mock/department/del": success("删除"),
};
