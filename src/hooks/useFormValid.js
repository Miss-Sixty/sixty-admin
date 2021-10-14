export default function useFormValid(formRef) {
  function validForm() {
    const form = formRef.value
    if (form) return form.validate()
  }

  function resetFields() {
    const form = formRef.value
    if (form) return form.resetFields()
  }

  return { validForm, resetFields }
}
