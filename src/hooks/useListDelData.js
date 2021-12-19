import { ElNotification } from 'element-plus'
import { unref } from 'vue'

/**
 * 删除列表数据
 * @param {function} api 请求列表api
 * @param {object} tableList 列表数据
 *
 * @return {function} 删除请求事件
 * @param {object} row 待删除row数据
 * @param {number} index 待删除数据下标
 */
export default function(api, tableList) {
  return (row, index) => {
    console.log(tableList)
    row.loading = true
    api({ id: row.id })
      .then(res => {
        unref(tableList.value).splice(index, 1)
        ElNotification.success({
          title: '提示',
          message: res.message
        })
      })
      .finally(() => (row.loading = false))
  }
}
