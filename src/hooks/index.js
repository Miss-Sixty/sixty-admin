import { ref, unref, nextTick } from 'vue'
import router from '@/router'
import { ElMessageBox } from 'element-plus'

/**
 * 路由跳转页面
 * @param {obj} 路由对象
 */
export function toRouter(obj) {
  router.push(obj)
}

export function messageBoxChange(text) {
  return ElMessageBox.confirm(text, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
}

/**
 * 表单验证&重制表单
 * @returns refDom & 验证结果promise
 * @param {function} callback 回调函数
 */
export function validateForm() {
  const formRef = ref(null)

  const validateFormChange = () => {
    const form = unref(formRef)
    if (!form) return
    return form.validate()
  }

  const resetFieldsForm = callback => {
    const form = unref(formRef)
    if (!form) return
    nextTick(() => {
      form.resetFields()
      if (callback) callback()
    })
  }

  return {
    formRef,
    validateFormChange,
    resetFieldsForm,
  }
}

/**
 * 循环填写数据
 * @param {object} data 表格row数据
 * @param {object} formData 表单数据
 * @param {array} omit 忽略的key
 * @param {function} callback 回调函数
 */
export function forInData(data, toData, omit = []) {
  if (!data) return
  for (let key in toData) {
    if (!omit.includes(key)) {
      toData[key] = data[key]
    }
  }
}
