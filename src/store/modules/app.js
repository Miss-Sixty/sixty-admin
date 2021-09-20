import { defineStore } from 'pinia'
import store from '@/store'

export const useAppStore = defineStore('app-store', {
  state: () => ({
    dot: true,
    number: 10,
    text: '热门',
  }),
  actions: {},
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store)
}
