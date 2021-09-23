export default function useFormValid(formRef) {
  function validForm() {
    const form = formRef.value
    if (form) return form.validate()
  }

  return { validForm }
}
