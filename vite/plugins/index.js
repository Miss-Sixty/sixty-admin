import vue from "@vitejs/plugin-vue";

import createHtml from "./html.js";
import createMock from "./mock.js";

export default function createVitePlugins(viteEnv) {
  return [vue(), createHtml(viteEnv), createMock()];
}
