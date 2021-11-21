import useForInData from './useForInData'
import { ElNotification } from 'element-plus'
/**
 * 获取列表数据、删除列表数据
 * api：list-列表api del-删除api
 * tableData：分页数据和列表数据
 * tableQuery：列表参数
 * omit：循环写入tableData数据时排除的参数
 */
export default function ({ list, del }, tableData, tableQuery, omit = ['list']) {
  function getListData() {
    tableData.loading = true
    list(tableQuery)
      .then(res => {
        console.log(res)
        const { paginate, list } = res.data
        if (!list && !paginate) return (tableData.list = res.data)
        tableData.list = list
        useForInData(paginate, tableData, omit)
      })
      .finally(() => (tableData.loading = false))
  }

  //删除
  async function onDelChange({ row, index }) {
    try {
      row.disabled = true
      const res = await del({ id: row.id })
      tableData.list.splice(index, 1)
      tableData.total -= 1

      ElNotification({
        title: '提示',
        message: res.message,
        type: 'success',
      })
    } finally {
      row.disabled = false
    }
  }
  return { getListData, onDelChange }
}
