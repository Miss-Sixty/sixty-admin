<script setup>
import Logo from './Logo.vue'
import { useSettingsStore } from '@/stores/setting'
import { useMenuStore } from '@/stores/menu'
import SidebarMenuItem from './SidebarMenuItem.vue'
const settingsStore = useSettingsStore()
const menuStore = useMenuStore()
</script>

<template>
  <el-menu :default-active="$route.meta.activeMenu || $route.path" router :collapse="settingsStore.collapse">
    <el-affix :z-index="1">
      <Logo :collapse="settingsStore.collapse" />
    </el-affix>
    <template v-for="(route, index) in menuStore.activeMenuRoutes">
      <SidebarMenuItem
        v-if="route?.meta?.sidebar !== false && route.path"
        :key="route.path || index"
        :item="route"
        :base-path="route.path"
      />
    </template>
  </el-menu>
</template>

<style lang="scss" scoped>
.el-menu {
  border: none;
  &:not(.el-menu--collapse) {
    width: $sidbar-menu-width;
  }
}
</style>
