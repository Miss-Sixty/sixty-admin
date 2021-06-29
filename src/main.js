import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import installElementPlus from "./plugins/element";
import "element-plus/lib/theme-chalk/index.css";

createApp(App).use(installElementPlus).use(store).use(router).mount("#app");
