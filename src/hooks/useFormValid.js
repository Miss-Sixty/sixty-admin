import { unref } from 'vue'

export default function useFormValid(formRef) {
  function validate() {
    return unref(formRef) && unref(formRef).validate()
  }

  function resetFields() {
    return unref(formRef) && unref(formRef).resetFields()
  }

  return { validate, resetFields }
}
