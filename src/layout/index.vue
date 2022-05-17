<script setup>
import Sidebar from './components/Sidebar/index.vue'
import HeadBar from './components/HeadBar/index.vue'
import AppMain from './components/AppMain.vue'
import { useSettingsStore } from '@/stores/setting'
const settingsStore = useSettingsStore()

// 侧边栏宽度
</script>

<template>
  <Sidebar
    class="sidebar"
    :class="{
      'sidebar-mobile': settingsStore.mode === 'mobile',
      show: settingsStore.mode === 'mobile' && settingsStore.sidebar.subMenuCollapse,
    }"
  />
  <transition name="fade">
    <div
      v-if="settingsStore.mode === 'mobile' && settingsStore.sidebar.subMenuCollapse"
      class="sidebar-mask"
      @click="settingsStore.setCollapse()"
    />
  </transition>
  <div class="right">
    <HeadBar
      class="head-bar"
      :class="settingsStore.mode === 'mobile' ? '' : settingsStore.collapse ? 'sidbar-collapse-width' : 'sidbar-width'"
    />
    <AppMain
      class="app-main"
      :class="settingsStore.mode === 'mobile' ? '' : settingsStore.collapse ? 'sidbar-collapse-width' : 'sidbar-width'"
    />
  </div>
</template>

<style lang="scss" scoped>
.sidbar-width {
  margin-left: $sidbar-width;
}
.sidbar-collapse-width {
  margin-left: $sidbar-collapse-width;
}
.sidebar {
  height: 100vh;
  display: flex;
  box-shadow: var(--el-box-shadow-light);
  transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s;
  background-color: var(--el-bg-color-page);
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  bottom: 0;
  &-mobile {
    z-index: 1010;
    transform: translateX(calc($sidbar-width * -1));
    &.show {
      transform: translateX(0);
    }
  }
}

.sidebar-mask {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--el-overlay-color-lighter);
}
.head-bar {
  height: $headbar-height;
  border-bottom: 1px solid var(--el-border-color);
  background-color: var(--el-fill-color-blank);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: margin-left 0.3s ease-in-out;
}

.app-main {
  transition: margin-left 0.3s ease-in-out;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
