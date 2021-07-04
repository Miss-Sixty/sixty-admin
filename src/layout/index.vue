<template>
  <div class="layout">
    <nav-menu class="navmenu" :isCollapse="isCollapse" />

    <div class="content">
      <head-bar @collapseChange="isCollapse = !isCollapse" />
      <el-scrollbar
        view-style="display: flex;flex-direction: column;height:100%"
      >
        <app-main />
        <footer-bar v-if="showCopyright" />
        <el-backtop target=".content .el-scrollbar__wrap" />
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import AppMain from "./components/AppMain";
import FooterBar from "./components/FooterBar";
import HeadBar from "./components/HeadBar";
import NavMenu from "./components/NavMenu";
import setting from "@/setting";
import { ref } from "vue";
export default {
  components: {
    AppMain,
    FooterBar,
    HeadBar,
    NavMenu,
  },
  setup() {
    const isCollapse = ref(false);
    return {
      showCopyright: setting.showCopyright,
      isCollapse,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/var.scss";
.layout {
  display: flex;

  .content {
    height: 100vh;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>
