import request from "@/utils/request";

// 后台-管理员登录
export function login(data) {
  return request.post("mock/member/login", { data });
}

// // 后台-管理员退出登录
// export function logout() {
//   return request({
//     url: "/admin/logout",
//     method: "post",
//   }).then((res) => res.data);
// }

// // 用户信息
// export function adminInfo() {
//   return request({
//     url: "/admin/info",
//   }).then((res) => res.data);
// }
