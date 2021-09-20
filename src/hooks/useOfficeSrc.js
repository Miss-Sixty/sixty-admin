/**
 * @param {string} src
 * @returns office在线预览地址
 */
export default function (src) {
  if (!src) return console.error('请输入文件地址')
  return `https://view.officeapps.live.com/op/view.aspx?src=${src}`
}
