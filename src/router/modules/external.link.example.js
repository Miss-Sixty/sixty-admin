import Layout from "@/layout";

export default {
  path: "/link",
  component: Layout,
  name: "externalLinkExample",
  meta: {
    title: "外链",
    icon: "sidebar-external-link",
  },
  children: [
    {
      path: "https://www.baidu.com",
      meta: {
        title: "百度一下",
      },
    },
    {
      path: "https://www.google.com",
      meta: {
        title: "Google 一下",
      },
    },
  ],
};
