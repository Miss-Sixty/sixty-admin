import { auth, authAll } from '@/utils'

export default app => {
  app.directive('auth', {
    mounted: (el, binding) => {
      if (!auth(binding.value)) {
        el.remove()
      }
    },
  })

  app.directive('auth-all', {
    mounted: (el, binding) => {
      if (!authAll(binding.value)) {
        el.remove()
      }
    },
  })
}
