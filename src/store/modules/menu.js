import router, { asyncRoutes, lastRoutes } from "@/router";

function hasPermission(permissions, route) {
  let isAuth = false;
  if (route.meta && route.meta.auth) {
    isAuth = permissions.some((auth) => {
      if (typeof route.meta.auth === "string") {
        return route.meta.auth === auth;
      } else {
        return route.meta.auth.some((routeAuth) => {
          return routeAuth === auth;
        });
      }
    });
  } else {
    isAuth = true;
  }
  return isAuth;
}

function filterAsyncRoutes(routes, permissions) {
  const res = [];
  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(permissions, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, permissions);
        tmp.children.length && res.push(tmp);
      } else {
        res.push(tmp);
      }
    }
  });
  return res;
}

const state = {
  isGenerate: false,
  routes: [],
  headerActived: 0,
  permissions: [],
};

const getters = {
  sidebarRoutes: (state) => {
    return state.routes.length > 0
      ? state.routes[state.headerActived].children
      : [];
  },
};

const actions = {
  // 根据权限动态生成路由
  generateRoutes({ commit }, { roles, currentPath }) {
    return new Promise((resolve) => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      commit("SETROUTERS", accessedRoutes);
      console.log(currentPath);

      let routes = [];
      accessedRoutes.map((item) => {
        routes.push(...item.children);
      });
      routes.push(...lastRoutes);

      resolve(routes);
    });
  },
};

const mutations = {
  SETROUTERS(state, routes) {
    state.routes = routes.filter((item) => item.children?.length !== 0);
  },

  CLEARROUTERS(state) {
    let routes = [];
    state.routes.map((item) => {
      routes.push(...item.children);
    });

    routes.forEach((route) => {
      console.log(route);
      router.removeRoute(route.name);
    });
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
