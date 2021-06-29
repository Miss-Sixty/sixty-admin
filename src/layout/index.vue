<template>
  <nav-menu class="navmenu" />

  <div class="content">
    <head-bar />
    <app-main />
    <footer-bar v-if="showCopyright" />
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
  background-color: cadetblue;
  float: left;
}
.content {
  margin-left: $navmenu-width;
  padding-top: $headbar-height;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
