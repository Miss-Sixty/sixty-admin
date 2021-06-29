import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout";

const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: () => import(/* webpackChunkName: "about" */ "@/views/home"),
        name: "Home",
        meta: { title: "首页", icon: "el-icon-s-home" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
