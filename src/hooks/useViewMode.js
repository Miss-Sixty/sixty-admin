import { ref } from 'vue'
import router from '@/router'

export default function(mode, title, routerName) {
  const visible = ref(false)

  const onChange = () => {
    if (mode === 'router') return router.push({
      name: routerName
    })

    visible.value = true
  }

  const modeData = {
    title
  }

  return { visible, onChange, modeData }
}
