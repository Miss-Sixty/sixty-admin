import { unref } from 'vue'

export default function useFormValid(formRef) {
  async function validForm() {
    const form = unref(formRef)
    if (!form) return
    return await form.validate()
  }

  return { validForm }
}
