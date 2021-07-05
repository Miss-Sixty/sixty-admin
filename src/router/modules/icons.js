import Layout from "@/layout";

export default {
  path: "/icons",
  component: Layout,
  redirect: "/icons/page",
  meta: {
    title: "图标",
    icon: "icon",
  },
  children: [
    {
      path: "/icons/page",
      name: "SketchIcons",
      component: () => import("@/views/icons"),
      meta: {
        title: "sketch 图标",
      },
    },
    {
      path: "/icons/svgIcons",
      name: "SvgIcons",
      component: () => import("@/views/icons/svg"),
      meta: {
        title: "导入图标",
      },
    },
  ],
};
