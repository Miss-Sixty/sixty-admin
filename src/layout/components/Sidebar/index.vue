<template>
  <el-row class="sidebar">
    <main-sidebar />
    <nav-menu />
  </el-row>
</template>

<script setup>
import MainSidebar from './components/MainSidebar'
import NavMenu from './components/NavMenu'
</script>
<style lang="scss" scoped>
.sidebar {
  // TODO:兼容手机端
  box-shadow: 10px 0 10px -10px #c7c7c7;
  z-index: 2;
}
</style>
