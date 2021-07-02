import router from "@/router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false }); // 去掉加载圆圈
import store from "@/store";
import { ElMessage } from "element-plus";

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
      return {
        name: to.name,
        replace: true,
      };
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

router.afterEach(async () => {
  try {
    await store.dispatch("user/getNotice");
  } catch (err) {
    console.log(err);
  }
  NProgress.done(); // finish progress bar
});
