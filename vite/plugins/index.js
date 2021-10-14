import vue from "@vitejs/plugin-vue";

import createHtml from "./html.js";
import createMock from "./mock.js";

export default function createVitePlugins(viteEnv, isBuild = false) {
  return [vue(), createHtml(viteEnv, isBuild), createMock()];
}
