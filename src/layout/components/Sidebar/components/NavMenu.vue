<template>
  <el-scrollbar style="flex: 1" view-style="height: 100vh;" @scroll="scroll => (isScrollTop = !!scroll.scrollTop)">
    <el-menu
      :collapse="collapse"
      unique-opened
      :default-active="route.meta.activeMenu || route.path"
     
    >
      <el-affix :z-index="1">
        <logo-name :is-scroll-top="isScrollTop" />
      </el-affix>
      <nav-menu-item v-for="item in routerList" :key="item.path" :item="item" :base-path="item.path" />
    </el-menu>
  </el-scrollbar>
</template>

<script setup>
import LogoName from './Logo.vue'
import NavMenuItem from './NavMenuItem.vue'
import { useSettingStore } from '@/store/modules/setting'
import { useMenuStore } from '@/store/modules/menu'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
// import variables from '@/styles/resources/var.scss'
const menuStore = useMenuStore()
const route = useRoute()
const isScrollTop = ref(false)
const collapse = computed(() => useSettingStore().collapse)
const routerList = computed(() => menuStore.activeMenuRoutes)
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
