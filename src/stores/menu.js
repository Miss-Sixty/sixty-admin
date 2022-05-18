import { defineStore } from 'pinia'
import router, { asyncRoutes, lastRoutes } from '@/router'
import stores from '@/stores'
import { useUserStore } from '@/stores/user'
import { cloneDeep } from 'lodash-es'
import { isExternalLink } from '@/utils/verify'

// 无限循环所有路由
function routersfilter(asyncRoutes, routeAuth) {
  function listFilter(list) {
    return list
      .map((node) => ({ ...node }))
      .filter((node) => {
        node.children = node.children && listFilter(node.children)
        return routeAuth(node)
      })
  }
  return listFilter(asyncRoutes)
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
    activeMenuRoutes: (state) => state.allRoutes[state.headerActived].children || [],
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
      const auths = await userStore.getRoleList()
      // 是否有权限
      // const routeAuth = (route) => {
      //   const { auth } = route?.meta || {}
      //   return auth ? rules.some((role) => auth.includes(role)) : true
      // }
      // this.allRoutes = routersfilter(asyncRoutes, routeAuth).filter((item) => item.children?.length)
      // this.removeRoutes = [...this.flatRoutes, lastRoutes].map((route) => router.addRoute(route))
      routesfilter(auths)
    },
  },
})

// 是否有权限
const routeAuth = (auth, adminAuths) => {
  return auth ? adminAuths.some((role) => auth.includes(role)) : true
}

// 对象中有auth则进行对比，对比为false则直接跳出
// 如果children中只有一个子，则子替换该路由父级
// 如果路由有3级以上则拍扁成3级路由
const routesfilter = (adminAuths) => {
  let leaf = 0
  const menuRoutes = []
  const flatRoutes = []
  function listFilter(children, leaf, path) {
    leaf++
    // console.log(children)
    children.forEach((item) => {
      const { path, meta, children } = item
      const { title, auth } = meta || {}
      console.log(item, leaf)
      // 判断是否有权限 没权限则返回
      if (!routeAuth(auth, adminAuths)) return

      if (leaf === 2) {
        // console.log(item, leaf)
        console.log('此处再有children，则开始拍扁路由')
      }
      if (children?.length) listFilter(children, leaf)
    })
  }

  asyncRoutes.forEach((item) => listFilter(item.children, leaf))
}

export function useMenuStoreWithOut() {
  return useMenuStore(stores)
}
