<template>
  <nav class="sidebar">
    <main-sidebar />
    <nav-menu />
  </nav>
</template>

<script setup>
import MainSidebar from './components/MainSidebar'
import NavMenu from './components/NavMenu'
</script>
<style lang="scss" scoped>
.sidebar {
  display: flex;
  box-shadow: 10px 0 10px -10px #c7c7c7;
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 2;
}
</style>
