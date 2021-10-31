import useFormValid from '@/hooks/useFormValid'
import { ElNotification, ElMessageBox } from 'element-plus'
import router from '@/router'

/**
 * 新增/修改数据提交
 * @param {ref} ref 验证 form 表单
 * @param {function} fn 新增/修改数据接口函数
 * @param {object} formData 新增/修改发送数据
 * @param {object} loading 页面加载
 * @param {object} text 跳转页面提醒
 */
export default function useAddOrEditSubmit(ref, routerName) {
  const { validForm } = useFormValid(ref)

  async function submitHandleChange(fn, formData = {}, state = {}, text = '新增') {
    try {
      await validForm()
      state.loading = true
      const res = await fn(formData)
      ElNotification.success({
        title: '提示',
        message: res.message,
      })
      if (!routerName) return
      setTimeout(async () => {
        await ElMessageBox.confirm(`${text}成功，是否退出${text}页？`, '提示', { type: 'warning' })
        router.push({ name: routerName })
      }, 500)
    } finally {
      state.loading = false
    }
  }

  return submitHandleChange
}
