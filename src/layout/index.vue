<template>
  <el-row type="flex">
    <nav-menu class="navmenu" :is-collapse="isCollapse" />
    <div class="content">
      <head-bar :is-collapse="isCollapse" :is-scroll-top="!showTagView && isScrollTop" @collapseChange="isCollapse = !isCollapse" />
      <tag-view v-if="showTagView" :is-scroll-top="isScrollTop" />
      <el-scrollbar
        class="page-component__scroll"
        view-style="display: flex;flex-direction: column;height:100%"
        @scroll="scroll => (isScrollTop = !!scroll.scrollTop)"
      >
        <app-main />
        <footer-bar />
        <el-backtop target=".page-component__scroll .el-scrollbar__wrap" :bottom="90" />
      </el-scrollbar>
    </div>
  </el-row>
</template>

<script setup>
import AppMain from './components/AppMain'
import FooterBar from './components/FooterBar'
import HeadBar from './components/HeadBar'
import NavMenu from './components/NavMenu'
import TagView from './components/TagView'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
const sotre = useStore()
const isCollapse = ref(false)
const isScrollTop = ref(false)
const showTagView = computed(() => sotre.state.setting.showTagView)
</script>

<style lang="scss" scoped>
.content {
  overflow: hidden;
  height: 100vh;
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
