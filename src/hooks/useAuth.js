import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()

function hasPermission(permission) {
  return userStore.roles.some(v => v === permission)
}

export function useAuth(value) {
  return typeof value === 'string' ? hasPermission(value) : value.some(item => hasPermission(item))
}

export function useAuthAll(value) {
  return value.every(item => hasPermission(item))
}
