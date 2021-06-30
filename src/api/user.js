import request from "@/utils/request";

// 后台-管理员登录
export function login(params) {
  return request.get("/mock/user/login", { params }).then((res) => res.data);
}

// 用户信息
export function info() {
  return request.get("/mock/user/info").then((res) => res.data);
}

// 用户通知
export function notice() {
  return request.get("/mock/user/notice").then((res) => res.data);
}

// 后台-管理员退出登录
export function logout() {
  return request.post("/mock/user/logout").then((res) => res.data);
}
