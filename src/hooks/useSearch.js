import useForInData from './useForInData'

export default function searchChange(currentPage, getListData, search) {
  function onSearchChange() {
    currentPage = 1
    getListData()
  }
  function onResetChange() {
    useForInData({}, search)
    onSearchChange()
  }
  return {
    onSearchChange,
    onResetChange,
  }
}
