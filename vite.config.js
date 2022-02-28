import { defineConfig, loadEnv } from 'vite'
import createVitePlugins from './vite/plugins/index.js'
import dayjs from 'dayjs'
import fs from 'fs'
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
const filename = fileURLToPath(import.meta.url);
const _dirname = dirname(filename);

export default ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  // 全局 scss 资源
  const scssResources = []
  fs.readdirSync('src/styles/resources').map(dirname => {
    if (fs.statSync(`src/styles/resources/${dirname}`).isFile()) {
      scssResources.push(`@import "src/styles/resources/${dirname}";`)
    }
  })

  return defineConfig({
    base: './',
    plugins: createVitePlugins(env),
    resolve: {
      alias: {
        '@': resolve(_dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: scssResources.join(''),
        },
      },
    },
    define: {
      __UPDATE_TIME__: JSON.stringify(dayjs().format('YYYY-M-D HH:mm:ss')),
    },
    server: {
      host: '0.0.0.0',
    },
  })
}
