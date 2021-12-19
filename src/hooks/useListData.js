import { ref } from 'vue'

/**
 * 获取列表数据
 * @param {function} api 请求列表api
 * @param {object} props{} tableQuery 请求列表api参数
 * @param {object} props{} fetch_all 是否分页
 * @return {function} getListData 请求事件
 * @return {array} list 列表数据
 * @return {function} paginate 分页数据
 * @return {boolean} loading 是否请求中
 */
export default function(api, newProps) {
  const props = { tableQuery: {}, fetch_all: false, ...newProps }
  const loading = ref(false)
  const list = ref([])
  const paginate = ref({ current_page: 1, page_size: 10, total: 0 })

  function getListData(callBack) {
    loading.value = true
    const { current_page: page, page_size: per_page } = paginate.value
    api({ ...props.tableQuery, page, per_page })
      .then(res => {
        if (props.fetch_all) list.value = res.data
        else {
          list.value = res?.data?.list
          paginate.value = res?.data?.paginate
        }
      })
      .finally(() => {
        loading.value = false
        typeof callBack === 'function' && callBack()
      })
  }

  return { getListData, loading, list, paginate }
}
