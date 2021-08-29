<template>
  <el-row type="flex">
    <sidebar />
    <div class="content">
      <head-bar :is-scroll-top="isScrollTop" />
      <el-scrollbar
        class="scroll"
        style="position: static"
        view-style="display: flex;flex-direction: column;height:100%;"
        @scroll="scroll => (isScrollTop = !!scroll.scrollTop)"
      >
        <app-main />
        <footer-bar />
        <el-backtop target=".scroll .el-scrollbar__wrap" :bottom="90" />
      </el-scrollbar>
    </div>
  </el-row>
</template>

<script setup>
import AppMain from './components/AppMain'
import FooterBar from './components/FooterBar'
import HeadBar from './components/HeadBar'
import Sidebar from './components/Sidebar'
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import useWindowResize from '@/hooks/useWindowResize'
const store = useStore()
const isScrollTop = ref(false)
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
