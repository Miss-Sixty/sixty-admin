import { useAuth, useAuthAll } from '@/hooks/useAuth'

export default (app) => {
  app.directive('auth', (el, binding) => {
    return !useAuth(binding.value) && el.remove()
  })

  app.directive('auth-all', (el, binding) => {
    return !useAuthAll(binding.value) && el.remove()
  })
}
