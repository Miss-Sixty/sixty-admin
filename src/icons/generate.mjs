// 代码来自 element-plus-icons https://github.com/element-plus/element-plus-icons/blob/main/packages/vue/build/generate.ts
// 稍微调整了部分代码
import { readFile, writeFile } from 'fs/promises'
import { emptyDir, ensureDir } from 'fs-extra'
import camelcase from 'camelcase'
import glob from 'fast-glob'
import { format } from 'prettier'
import chalk from 'chalk'
import { dirname, resolve, basename } from 'path'
import { fileURLToPath } from 'url'

const dir = dirname(fileURLToPath(import.meta.url))
const pathComponents = resolve(dir, './vue')
const pathSvg = resolve(dir, './svg')

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

const formatCode = (code, parser = 'babel') =>
  format(code, {
    parser,
    semi: false,
    singleQuote: true,
  })

const transformToVueComponent = async (file) => {
  const content = await readFile(file, 'utf-8')
  const { filename, componentName } = getName(file)
  const vue = formatCode(
    `
<template>
${content}
</template>
<script>
export default ({
  name: "${componentName}",
})
</script>`,
    'vue'
  )
  writeFile(resolve(pathComponents, `${filename}.vue`), vue, 'utf-8')
}

const generateEntry = async (files) => {
  const code = formatCode(
    files
      .map((file) => {
        const { filename, componentName } = getName(file)
        return `export { default as ${componentName} } from './vue/${filename}.vue'`
      })
      .join('\n')
  )
  await writeFile(resolve(dir, './index.js'), code, 'utf-8')
}

console.info(chalk.blue('开始生成 Vue 组件代码'))
await ensureDir(pathComponents)
await emptyDir(pathComponents)
const files = await getSvgFiles()
console.info(chalk.blue('开始生成 Vue 文件'))
await Promise.all(files.map((file) => transformToVueComponent(file)))
console.info(chalk.blue('结束'))
await generateEntry(files)
