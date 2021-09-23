/**
 * 循环填写数据
 * @param {object} data 表格row数据
 * @param {object} formData 表单数据
 * @param {array} omit 忽略的key
 */
export default function forInData(data, toData, omit = []) {
  if (!data) return
  for (let key in toData) {
    if (!omit.includes(key)) {
      toData[key] = data[key] ?? '' //第一项为 null 或 undefined 时设置默认值，排除0
    }
  }
}
