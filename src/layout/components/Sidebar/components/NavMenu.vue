<template>
  <el-scrollbar view-style="height: 100vh" @scroll="scroll => (isScrollTop = !!scroll.scrollTop)">
    <el-menu
      :collapse="isCollapse"
      unique-opened
      :default-active="route.meta.activeMenu || route.path"
      :text-color="variables.navmenu_color"
      :active-text-color="variables.navmenu_active_color"
    >
      <el-affix :z-index="1">
        <logo-name :is-scroll-top="isScrollTop" />
      </el-affix>
      <template v-for="item in routerList" :key="item.path">
        <nav-menu-item v-if="!item.hidden" :key="item.path" :item="item" :base-path="item.path" />
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script setup>
import LogoName from './Logo'
import NavMenuItem from './NavMenuItem'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import variables from '@/styles/resources/var.scss'

const store = useStore()
const route = useRoute()
const isScrollTop = ref(false)
const isCollapse = computed(() => store.state.setting.sidebarCollapse)
const routerList = computed(() => store.getters['menu/menuRoutes'])
</script>

<style lang="scss" scoped>
:deep(.el-menu) {
  border: none;
  height: 100%;
  background-color: $navmenu-bg;
  &:not(.el-menu--collapse) {
    width: $navmenu-width;
  }
}
</style>
