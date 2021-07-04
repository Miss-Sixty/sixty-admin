import Layout from "@/layout";

export default {
  path: "/icons",
  component: Layout,
  redirect: "/icons/page",
  meta: {
    title: "图标",
    icon: "el-icon-menu",
  },
  children: [
    {
      path: "/icons/page",
      name: "Icons",
      component: () => import("@/views/icons"),
      meta: {
        title: "sketch 图标",
      },
    },
  ],
};
