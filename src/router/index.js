import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout";

const constantRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: () => import("@/views/home"),
        name: "Home",
        meta: { title: "首页", icon: "el-icon-s-home" },
      },
    ],
  },
  {
    path: "/reload",
    name: "Reload",
    component: () => import("@/views/reload"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login"),
  },
];

import MultilevelMenuExample from "./modules/multilevel.menu.example";
// TODO:设想最左侧有一竖行主导航，当 children 不为空的主导航只有一项时，则隐藏
export const asyncRoutes = [
  {
    meta: {
      title: "导航1",
      icon: "el-icon-eleme",
    },
    children: [MultilevelMenuExample],
  },
  {
    meta: {
      title: "导航2",
      icon: "el-icon-s-goods",
    },
    children: [MultilevelMenuExample],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRoutes,
});

export default router;
