import { defineStore } from 'pinia'
import router, { asyncRoutes, lastRoutes } from '@/router'
import stores from '@/stores'
import { useUserStore } from '@/stores/user'
import { cloneDeep, isString, isArray } from 'lodash-es'
import { isExternalLink } from '@/utils/verify'

function filterAsyncMenus(menus, permissions) {
  const res = []
  menus.forEach((menu) => {
    let tmpMenu = cloneDeep(menu)
    if (!hasPermission(permissions, tmpMenu)) return
    if (tmpMenu?.children?.length) {
      tmpMenu.children = filterAsyncMenus(tmpMenu.children, permissions)
    }
    res.push(tmpMenu)
  })
  return res
}

function hasPermission(permissions, route) {
  let isAuth = false
  if (route?.meta?.auth) {
    isAuth = permissions.some((auth) => {
      if (isString(route.meta.auth)) {
        return route.meta.auth === auth
      }
      if (isArray(route.meta.auth)) {
        return route.meta.auth.some((routeAuth) => routeAuth === auth)
      }
    })
  } else {
    isAuth = true
  }
  return isAuth
}

// 将多层嵌套路由处理成平级
function flatAsyncRoutes(routes, breadcrumb, baseUrl = '') {
  let res = []
  routes.forEach((route) => {
    if (route.children) {
      let childrenBaseUrl = ''
      if (baseUrl == '') {
        childrenBaseUrl = route.path
      } else if (route.path != '') {
        childrenBaseUrl = `${baseUrl}/${route.path}`
      }
      let childrenBreadcrumb = cloneDeep(breadcrumb)
      if (route.meta.breadcrumb !== false) {
        childrenBreadcrumb.push({
          path: childrenBaseUrl,
          title: route?.meta?.title,
        })
      }
      let tmpRoute = cloneDeep(route)
      tmpRoute.path = childrenBaseUrl
      tmpRoute.meta.breadcrumbNeste = childrenBreadcrumb
      delete tmpRoute.children
      res.push(tmpRoute)
      let childrenRoutes = flatAsyncRoutes(route.children, childrenBreadcrumb, childrenBaseUrl)
      childrenRoutes.map((item) => {
        // 如果 path 一样则覆盖，因为子路由的 path 可能设置为空，导致和父路由一样，直接注册会提示路由重复
        if (res.some((v) => v.path == item.path)) {
          res.forEach((v, i) => {
            if (v.path == item.path) {
              res[i] = item
            }
          })
        } else {
          res.push(item)
        }
      })
    } else {
      let tmpRoute = cloneDeep(route)
      if (baseUrl != '' && !isExternalLink(tmpRoute.path)) {
        if (tmpRoute.path != '') {
          tmpRoute.path = `${baseUrl}/${tmpRoute.path}`
        } else {
          tmpRoute.path = baseUrl
        }
      }
      // 处理面包屑导航
      let tmpBreadcrumb = cloneDeep(breadcrumb)
      if (tmpRoute.meta.breadcrumb !== false) {
        tmpBreadcrumb.push({
          path: tmpRoute.path,
          title: tmpRoute?.meta?.title,
        })
      }
      tmpRoute.meta.breadcrumbNeste = tmpBreadcrumb
      res.push(tmpRoute)
    }
  })
  return res
}

export const useMenuStore = defineStore({
  id: 'six-menu',
  state: () => ({
    allRoutes: [], // 带主导航的路由,用于渲染导航树
    headerActived: 0,
    removeRoutes: [],
  }),
  getters: {
    // 是否有路由
    isAllRoutes: (state) => state.allRoutes.length,
    // 侧边导航树
    activeMenuRoutes: (state) => state.allRoutes[state.headerActived].children,
    // 扁平化路由（将三级及以上路由数据拍平成二级）
    flatRoutes: (state) => {
      //去掉数组第一层
      const routes = cloneDeep([].concat(...state.allRoutes.map((item) => ({ ...item }.children))))
      if (!state.allRoutes.length) return
      routes.forEach((item) => {
        if (!item.children?.length) return
        const { path, meta } = item
        const { title } = meta || ''
        item.children = flatAsyncRoutes(item.children, [{ path, title }], path)
      })
      return routes
    },
  },
  actions: {
    async initRoutes() {
      const userStore = useUserStore()
      const userAuths = await userStore.getRoleList()

      const accessedMenus = filterAsyncMenus(asyncRoutes, userAuths)
      this.allRoutes = accessedMenus.filter((item) => !!item?.children?.length)
      this.removeRoutes = [...this.flatRoutes, lastRoutes].map((route) => router.addRoute(route))
    },
  },
})

export function useMenuStoreWithOut() {
  return useMenuStore(stores)
}
