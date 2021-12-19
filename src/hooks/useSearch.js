import useForInData from './useForInData'

export default function(getListData, search, omit = []) {
  return () => {
    useForInData({}, search, omit)
    getListData()
  }
}
