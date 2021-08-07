import { forInData } from './'

export default function searchChange(currentPage, getListData, search) {
  function onSearchChange() {
    currentPage = 1
    getListData()
  }
  function onResetChange() {
    forInData({}, search)
    onSearchChange()
  }
  return {
    onSearchChange,
    onResetChange,
  }
}
