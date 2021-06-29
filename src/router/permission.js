import router from "@/router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false }); // 去掉加载圆圈
router.beforeEach(async () => {
  NProgress.start(); // start progress bar
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});
