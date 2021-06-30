import router from "@/router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false }); // 去掉加载圆圈
import store from "@/store";

console.log(store);
router.beforeEach(async () => {
  NProgress.start(); // start progress bar
});

router.afterEach(async () => {
  try {
    await store.dispatch("user/getNotice");
  } catch (err) {
    console.log(err);
  }
  NProgress.done(); // finish progress bar
});
