<template>
  <nav-menu
    class="navmenu"
    :isCollapse="isCollapse"
    :class="{ 'navmenu--isCollapse': isCollapse }"
  />

  <div class="content">
    <head-bar @collapseChange="isCollapse = !isCollapse" />
    <el-scrollbar view-style="display: flex;flex-direction: column;height:100%">
      <app-main />
      <footer-bar v-if="showCopyright" />
      <el-backtop target=".content .el-scrollbar__wrap" />
    </el-scrollbar>
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
.navmenu {
  width: $navmenu-width;
  background-color: $g_sub_sidebar_bg;
  float: left;
  transition: 0.2s;

  &--isCollapse {
    width: $navmenu-collapse-width;
  }
}

.content {
  height: 100vh;
  // margin-left: $navmenu-width;
  display: flex;
  flex-direction: column;
}
</style>
