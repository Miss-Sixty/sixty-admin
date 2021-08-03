import Clipboard from 'clipboard'
if (!Clipboard) throw new Error('您需要先执行 npm install clipboard --save')

export default {
  name: 'clipboard',
  mounted(el, binding) {
    if (binding.arg === 'success') {
      el._v_clipboard_success = binding.value
    } else if (binding.arg === 'error') {
      el._v_clipboard_error = binding.value
    } else {
      const clipboard = new Clipboard(el, {
        text: () => binding.value,
        action: () => (binding.arg === 'cut' ? 'cut' : 'copy'),
      })
      clipboard.on('success', e => {
        const callback = el._v_clipboard_success
        callback && callback(e)
      })
      clipboard.on('error', e => {
        const callback = el._v_clipboard_error
        ;(callback && callback(e)) || console.error('复制错误，请重试！')
      })
      el._v_clipboard = clipboard
    }
  },
  updated(el, binding) {
    if (binding.arg === 'success') {
      el._v_clipboard_success = binding.value
    } else if (binding.arg === 'error') {
      el._v_clipboard_error = binding.value
    } else {
      el._v_clipboard.text = () => binding.value
      el._v_clipboard.action = () => (binding.arg === 'cut' ? 'cut' : 'copy')
    }
  },
  unmounted(el, binding) {
    if (binding.arg === 'success') {
      delete el._v_clipboard_success
    } else if (binding.arg === 'error') {
      delete el._v_clipboard_error
    } else {
      el._v_clipboard.destroy()
      delete el._v_clipboard
    }
  },
}
