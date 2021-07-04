import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import installElementPlus from "./plugins/element";
import "element-plus/lib/theme-chalk/index.css";
import "@/styles/index.scss";
import "@/router/permission"; //路由守卫
import "../mock/index.js"; //引入mock
import "@/icons"; // icon

//全局组件
import SvgIcon from "@/components/SvgIcon"; // svg组件

createApp(App)
  .component("SvgIcon", SvgIcon)
  .use(installElementPlus)
  .use(store)
  .use(router)
  .mount("#app");
