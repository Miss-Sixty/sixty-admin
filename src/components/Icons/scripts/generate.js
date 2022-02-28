// 代码来自 element-plus-icons https://github.com/element-plus/element-plus-icons/blob/main/packages/vue/build/generate.ts
// 稍微调整了部分代码
import chalk from 'chalk'
import { emptyDir } from 'fs-extra'
import { readFile, writeFile } from 'fs/promises'
import { fileURLToPath } from 'url';
import glob from 'fast-glob'
import camelcase from 'camelcase'
import { dirname, resolve, basename } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pathOutput = resolve(__dirname, "../components");
const pathSvg = resolve(__dirname, "../svg");

const getSvgFiles = async () => {
  return glob('*.svg', { cwd: pathSvg, absolute: true })
}

const getName = (file) => {
  const filename = basename(file).replace('.svg', '')
  const componentName = camelcase(filename, { pascalCase: true })
  return {
    filename,
    componentName,
  }
}

const transformToVueComponent = async (file) => {
  const content = await readFile(file, 'utf-8')
  const { filename, componentName } = getName(file)
  console.log(filename, componentName)

  const vue =
    `
  <template>
  ${content}
  </template>
  <script>
    import { defineComponent } from 'vue'
    export default defineComponent({
      name: "${componentName}",
    })
  </script>`
  writeFile(resolve(pathOutput, `${filename}.vue`), vue, 'utf-8')
}

  ; (async () => {
    console.info(chalk.blue('生成 Vue 组件'))
    await emptyDir(pathOutput)
    const files = await getSvgFiles()
    console.info(chalk.blue('生成 Vue 文件'))
    await Promise.all(files.map((file) => transformToVueComponent(file)))
  })()
