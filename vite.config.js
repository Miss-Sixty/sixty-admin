import { fileURLToPath, URL } from 'url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import setupExtend from 'vite-plugin-vue-setup-extend'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createHtmlPlugin } from 'vite-plugin-html'
import { viteMockServe } from 'vite-plugin-mock'

const fs = require('fs')

// https://vitejs.dev/config/
export default ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  // 全局 scss 资源
  const scssResources = []
  fs.readdirSync('src/styles/resources').map((dirname) => {
    if (fs.statSync(`src/styles/resources/${dirname}`).isFile()) {
      scssResources.push(`@import "src/styles/resources/${dirname}";`)
    }
  })

  return defineConfig({
    plugins: [
      vue(),
      setupExtend(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        dirs: [],
      }),
      createHtmlPlugin({
        inject: { data: { title: env.VITE_APP_TITLE } },
      }),
      viteMockServe({
        // default
        mockPath: '/mock',
        localEnabled: command === 'serve',
        injectCode: `
        import { setupProdMockServer } from './_createProductionServer';
        setupProdMockServer();
        `,
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: scssResources.join(''),
        },
      },
    },
  })
}
