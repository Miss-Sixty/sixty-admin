import { defineStore } from 'pinia'
import stores from '@/stores'

export const useAppStore = defineStore({
  id: 'six-app',
  state: () => ({
    dot: true,
    number: 10,
    text: '热门',
  }),
  actions: {},
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(stores)
}
