import { useAuth, useAuthAll } from '@/hooks/useAuth'

export default (app) => {
  app.directive('auth', {
    mounted: (el, binding) => !useAuth(binding.value) && el.remove(),
  })

  app.directive('auth-all', {
    mounted: (el, binding) => !useAuthAll(binding.value) && el.remove(),
  })
}
