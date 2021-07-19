import router, { asyncRoutes, lastRoutes } from '@/router'

function hasPermission(permissions, route) {
  let isAuth = false
  if (route.meta && route.meta.auth) {
    isAuth = permissions.some(auth => {
      if (typeof route.meta.auth === 'string') {
        return route.meta.auth === auth
      } else {
        return route.meta.auth.some(routeAuth => {
          return routeAuth === auth
        })
      }
    })
  } else {
    isAuth = true
  }
  return isAuth
}

function filterAsyncRoutes(routes, permissions) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(permissions, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, permissions)
        tmp.children.length && res.push(tmp)
      } else {
        res.push(tmp)
      }
    }
  })
  return res
}

const state = {
  isGenerate: false,
  routes: [],
  headerActived: 0,
  permissions: [],
}

const actions = {
  // 根据权限动态生成路由
  generateRoutes({ commit }, { roles, currentPath }) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      commit('SETROUTERS', accessedRoutes)
      commit('SETACTIVED', currentPath)

      let routes = []
      accessedRoutes.map(item => {
        routes.push(...item.children)
      })
      routes.push(...lastRoutes)

      resolve(routes)
    })
  },
}

const mutations = {
  SETROUTERS(state, routes) {
    state.routes = routes.filter(item => item.children?.length !== 0)
  },

  CLEARROUTERS(state) {
    let routes = []
    state.routes.map(item => {
      routes.push(...item.children)
    })

    routes.forEach(route => {
      router.removeRoute(route.name)
    })
  },

  // 根据路由判断属于哪个头部导航
  SETACTIVED(state, path) {
    state.routes.map((item, index) => {
      if (item.children.some(r => path.indexOf(r.path + '/') === 0 || path === r.path)) {
        state.headerActived = index
      }
    })
  },

  // 切换头部导航
  SWITCHACTIVED(state, index) {
    state.headerActived = index
  },
}

const getters = {
  sidebarRoutes: state => {
    return state.routes.length > 0 ? state.routes[state.headerActived].children : []
  },
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
}
