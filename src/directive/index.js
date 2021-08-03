/**
 * 全局指令自动注册
 * 全局指令按文件夹区分,文件夹内至少保留一个文件名为 index 的导出文件，例如 index.js
 */

const componentsContext = require.context('./', true, /index.js$/)

export default app => {
  componentsContext.keys().forEach(file_name => {
    // 获取文件中的 default 模块
    const directive = componentsContext(file_name).default
    directive.name && app.directive(directive.name, directive)
  })
}
