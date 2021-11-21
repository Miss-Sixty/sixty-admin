<template>
  <div class="layout">
    <sidebar class="sidebar" :style="{ transform: settingStore.maximize ? 'translateX(-100%)' : 'translateX(0)' }" />
    <div class="right">
      <head-bar class="head-bar" :class="[marginLeftType, headBarTopType]" />
      <app-main class="app-main" :class="[marginLeftType, marginTopType]" />
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar/index.vue'
import HeadBar from './components/HeadBar/index.vue'
import AppMain from './components/AppMain/index.vue'
import { useSettingStore } from '@/store/modules/setting'
import { computed } from 'vue'
const settingStore = useSettingStore()

//是否有主侧边栏
const isMainMenu = settingStore.alwaysShowMainSidebar

/**
 * maximize-最大化(隐藏菜单和头部)
 * no-collapse--main-sidebar-导航展开+有主菜单
 * no-collapse--no-main-sidebar-导航展开+无主菜单
 * collapse--main-sidebar-导航收起+有主菜单
 * collapse--no-main-sidebar-导航收起+无主菜单
 */
const marginLeftType = computed(() => {
  //是否最大化
  if (settingStore.maximize) return 'maximize'
  //导航展开
  if (settingStore.collapse) return isMainMenu ? 'no-collapse--main-sidebar' : 'no-collapse--no-main-sidebar'
  else return isMainMenu ? 'collapse--main-sidebar' : 'collapse--no-main-sidebar'
})

const marginTopType = computed(() => (settingStore.maximize ? 'top--zero' : 'top--base'))
const headBarTopType = computed(() => (settingStore.maximize ? 'headerbar-top--zero' : 'headerbar-top--base'))
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;

  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    transition: transform 0.3s;
  }
  .right {
    height: 100vh;
    overflow: hidden;

    .head-bar {
      position: fixed;
      left: 0;
      right: 0;
      transition: top 0.3s, margin-left 0.3s;
    }

    .app-main {
      transition: padding-top 0.3s, margin-left 0.3s;
    }
  }

  .no-collapse--main-sidebar {
    margin-left: $sidbar-collapse-width;
  }
  .no-collapse--no-main-sidebar {
    margin-left: $navmenu-collapse-width;
  }
  .collapse--main-sidebar {
    margin-left: $sidbar-width;
  }
  .collapse--no-main-sidebar {
    margin-left: $navmenu-width;
  }

  .top--zero {
    padding-top: 0;
  }
  .top--base {
    padding-top: $headbar-height;
  }

  .headerbar-top--zero {
    top: -$headbar-height;
  }
  .headerbar-top--base {
    top: 0;
  }
}
</style>
