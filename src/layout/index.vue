<template>
  <el-row type="flex" cla>
    <nav-menu />
    <div class="content">
      <head-bar :is-scroll-top="!showTagView && isScrollTop" />
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
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import useWindowResize from '@/hooks/useWindowResize'

const store = useStore()
const isScrollTop = ref(false)
const showTagView = computed(() => store.state.setting.showTagView)

const { width } = useWindowResize(150)
store.commit('setting/SET_MODE', width)
watch(width, width => store.commit('setting/SET_MODE', width))
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
