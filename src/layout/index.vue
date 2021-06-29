<template>
  <app-main />
  <footer-bar />
  <head-bar />
  <nav-menu />
</template>
<script>
import AppMain from "./components/AppMain";
import FooterBar from "./components/FooterBar";
import HeadBar from "./components/HeadBar";
import NavMenu from "./components/NavMenu";
export default {
  components: {
    AppMain,
    FooterBar,
    HeadBar,
    NavMenu,
  },
  setup() {},
};
</script>
