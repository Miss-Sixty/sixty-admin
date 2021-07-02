<template>
  <nav-menu class="navmenu" />

  <div class="content">
    <head-bar />
    <el-scrollbar>
      <app-main />
      <footer-bar v-if="showCopyright" />
    </el-scrollbar>
  </div>
</template>
<script>
import AppMain from "./components/AppMain";
import FooterBar from "./components/FooterBar";
import HeadBar from "./components/HeadBar";
import NavMenu from "./components/NavMenu";
import setting from "@/setting";
export default {
  components: {
    AppMain,
    FooterBar,
    HeadBar,
    NavMenu,
  },
  setup() {
    return {
      showCopyright: setting.showCopyright,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/var.scss";
.navmenu {
  width: $navmenu-width;
  background-color: $navmenu-bg;
  float: left;
}
.content {
  height: 100vh;
  margin-left: $navmenu-width;
  display: flex;
  flex-direction: column;
}
</style>
