import Layout from "@/layout";

export default {
  path: "/demo",
  component: Layout,
  redirect: "/demo/page",
  name: "demo",
  meta: {
    title: "测试测试测试测试测试测试测试测试",
    icon: "el-icon-menu",
  },
  children: [
    {
      path: "/demo/page",
      name: "demopage",
      component: () => import("@/views/demo"),
      meta: {
        title: "这是测试页",
      },
    },
  ],
};
