import router from "@/router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false }); // 去掉加载圆圈
import store from "@/store";
import { ElMessage } from "element-plus";
import setting from "@/setting";

router.beforeEach(async (to) => {
  NProgress.start(); // start progress bar
  const isLogin = store.getters["user/isLogin"];
  if (isLogin) {
    //已登陆不可跳转登陆页
    if (to.name === "Login") return false;

    //判断是否已有权限
    const hasRoles = store.state.user.roles?.length;
    if (hasRoles) return;

    try {
      const roles = await store.dispatch("user/permissions");
      const accessRoutes = await store.dispatch("menu/generateRoutes", {
        roles,
        currentPath: to.path,
      });
      accessRoutes.forEach((route) => {
        router.addRoute(route);
      });

      return { ...to, replace: true };
    } catch (error) {
      await store.commit("user/LOGOUT");
      ElMessage.error(error || "Has Error");
      return {
        name: "Login",
        query: {
          redirect: to.fullPath,
        },
      };
    }
  } else if (to.name !== "Login") {
    return {
      name: "Login",
      query: {
        redirect: to.fullPath,
      },
    };
  }
});

router.afterEach(async (to) => {
  NProgress.done(); // finish progress bar
  const title = setting.title || "sixty-admin";
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : `${title}`;

  await store.dispatch("user/getNotice");
});
