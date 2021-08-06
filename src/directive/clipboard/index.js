import copy from 'clipboard-copy'
if (!copy) throw new Error('您需要先执行 npm install clipboard-copy --save')

export default {
  name: 'clipboard',
  mounted(el, binding) {
    if (binding.arg === 'success') return (el._v_clipboard_success = binding.value)
    if (binding.arg === 'error') return (el._v_clipboard_error = binding.value)

    el.onclick = async () => {
      try {
        copy(binding.value)
        el._v_clipboard_success && el._v_clipboard_success('已复制到剪切板！')
      } catch (err) {
        el._v_clipboard_error && el._v_clipboard_error('复制错误！')
      }
    }
  },
  updated(el, binding) {
    if (binding.arg === 'success') return (el._v_clipboard_success = binding.value)
    if (binding.arg === 'error') return (el._v_clipboard_error = binding.value)

    el.onclick = async () => {
      try {
        copy(binding.value)
        el._v_clipboard_success && el._v_clipboard_success('已复制到剪切板！')
      } catch (err) {
        el._v_clipboard_error && el._v_clipboard_error('复制错误！')
      }
    }
  },
  unmounted(el, binding) {
    if (binding.arg === 'success') return delete el._v_clipboard_success
    if (binding.arg === 'error') return delete el._v_clipboard_error
    delete el._v_clipboard
  },
}
