import Layout from "@/layout";

export default {
  path: "/table",
  component: Layout,
  redirect: "/table/page",
  name: "table",
  meta: {
    title: "表格",
    icon: "el-icon-menu",
  },
  children: [
    {
      path: "/table/page",
      name: "tablePage",
      component: () => import("@/views/table"),
      meta: {
        title: "综合表格",
      },
    },
  ],
};
