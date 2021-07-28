import { onMounted, onUnmounted, ref } from 'vue'
import _debounce from 'lodash/debounce'

export default function useWindowResize(time = 200) {
  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)

  const onResize = _debounce(() => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }, time)

  onMounted(() => {
    window.addEventListener('resize', onResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
  })

  return {
    width,
    height,
  }
}
