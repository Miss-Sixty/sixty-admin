import { asyncRoutes, lastRoutes, constantRoutes } from '@/router'

/**
 * 使用 meta.auth 判断当前用户是否有权限
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  let isAuth = false
  if (route.meta?.auth) {
    isAuth = roles.some(auth => {
      if (typeof route.meta.auth === 'string') return route.meta.auth === auth
      return route.meta.auth.some(routeAuth => routeAuth === auth)
    })
  } else {
    isAuth = true
  }
  return isAuth
}

/**
 * 通过递归过滤异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
        tmp.children.length && res.push(tmp)
      } else {
        res.push(tmp)
      }
    }
  })
  return res
}

const state = {
  allRoutes: [], //带主导航的路由
  routes: [], //所有路由
  headerActived: 0, //当前主导航
  addRoutes: [], //动态路由
  removeRoutes: [], //用来删除动态添加路由
}

const actions = {
  // 根据权限动态生成路由
  generateRoutes({ commit }, { roles, currentPath }) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      commit('SET_ALL_ROUTERS', accessedRoutes) //带主导航的路由
      commit('SET_ACTIVED', currentPath)

      //遍历出所有路由
      let routes = []
      accessedRoutes.forEach(item => routes.push(...item.children))
      routes.push(...lastRoutes)
      commit('SET_ROUTERS', routes)
      resolve(routes)
    })
  },
}

const mutations = {
  SET_ALL_ROUTERS(state, allRoutes) {
    state.allRoutes = allRoutes.filter(item => item.children?.length !== 0)
  },

  SET_ROUTERS(state, routes) {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },

  // 根据路由判断属于哪个头部导航
  SET_ACTIVED(state, path) {
    state.allRoutes.forEach((item, index) => {
      if (item.children.some(r => path.indexOf(r.path + '/') === 0 || path === r.path)) {
        state.headerActived = index
      }
    })
  },

  // 切换头部导航
  SWITCH_ACTIVED(state, index) {
    state.headerActived = index
  },

  // 记录 accessRoutes 路由，用于登出时删除路由
  SET_REMOVE_ROUTERS(state, routes) {
    state.removeRoutes = routes
  },

  //清空动态路由
  CLEAR_ROUTERS(state) {
    state.removeRoutes.forEach(removeRoute => removeRoute())
  },
}

const getters = {
  menuRoutes: state => {
    if (!state.allRoutes.length) return
    function filterAsyncRouter(routers) {
      const res = []
      routers.forEach(route => {
        const tmp = { ...route }
        if (tmp.children?.length) {
          tmp.children = filterAsyncRouter(tmp.children)
          if (tmp.children?.length) res.push(tmp)
        } else {
          if (!tmp.hidden) res.push(tmp)
        }
      })
      return res
    }
    return filterAsyncRouter(state.allRoutes[state.headerActived].children)
  },
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
}
