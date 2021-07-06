import Layout from "@/layout";

export default {
  path: "/configuration",
  component: Layout,
  redirect: "/configuration/account-setting",
  name: "Configuration",
  meta: {
    title: "配置",
    icon: "user-settings-fill",
  },
  children: [
    {
      path: "/configuration/account-setting",
      name: "configurationUser",
      component: () => import("@/views/configuration/user"),
      meta: {
        title: "个人设置",
      },
    },
  ],
};
