import { defineStore } from 'pinia'
import router, { asyncRoutes } from '@/router'
import store from '@/store'

function filter(tree, func) {
  function listFilter(list) {
    return list
      .map(node => ({ ...node }))
      .filter(node => {
        node.children = node.children && listFilter(node.children)
        return func(node)
      })
  }
  return listFilter(tree)
}

export const useMenuStore = defineStore('menu-store', {
  state: () => ({
    allRoutes: [], //带主导航的路由
    headerActived: 0,
    removeRoutes: [],
  }),
  getters: {
    activeMenuRoutes() {
      return this.allRoutes[this.headerActived]?.children || []
    },
  },
  actions: {
    async generateRoutes(rules = []) {
      const routeFilter = route => {
        const { meta } = route
        const { auth, hidden } = meta || {}
        if (hidden) return false
        if (!auth) return true
        return rules.some(role => auth.includes(role))
      }
      let routes = filter(asyncRoutes, routeFilter)
      routes = routes.filter(routeFilter) //INFO:先过滤children，再过滤父
      this.allRoutes = routes

      // TODO:2级以上路由拍扁成2级路由
      const routers = [].concat(...asyncRoutes.map(item => ({ ...item }.children)))
      this.removeRoutes = routers.map(route => router.addRoute(route))
    },

    // 切换头部导航
    switchActive(index) {
      this.headerActived = index
    },
  },
})

// Need to be used outside the setup
export function useMenuStoreWithOut() {
  return useMenuStore(store)
}
