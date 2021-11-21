<template>
  <nav class="sidebar">
    <main-sidebar />
    <nav-menu />
  </nav>
</template>

<script setup>
import MainSidebar from './components/MainSidebar.vue'
import NavMenu from './components/NavMenu.vue'
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  box-shadow: 10px 0 10px -10px #c7c7c7;
  transition: width 0.3s ease-in-out;
  z-index: 2;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  transition: transform 0.3s;
}
</style>
