<template>
  <div class="layout">
    <transition name="fold">
      <sidebar v-show="getIsUnFold" />
    </transition>
    <div class="right" :class="{ 'right--isUnFold': !getIsUnFold, 'right--collapse': collapse }">
      <transition name="fold-top">
        <head-bar v-show="getIsUnFold" class="head-bar" :class="{ 'head-bar--collapse': collapse }" />
      </transition>
      <app-main class="app-main" :class="{ 'app-main--isUnFold': !getIsUnFold }" />
      <footer-bar />
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar'
import HeadBar from './components/HeadBar'
import AppMain from './components/AppMain'
import FooterBar from './components/FooterBar'
import { computed } from 'vue'

import { useSettingStore } from '@/store/modules/setting'
const { headerSetting, menuSetting } = useSettingStore()
const getIsUnFold = computed(() => menuSetting.show && headerSetting.show)
const collapse = computed(() => useSettingStore().collapse)
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;

  .head-bar {
    position: fixed;
    right: 0;
    left: $main-margin-left;
    transition: left 0.3s;
    &--collapse {
      left: $main-collapse;
    }
  }

  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin-left: $main-margin-left;
    transition: margin-left 0.3s;
    height: 100%;
    overflow-y: auto;
    &--isUnFold {
      margin-left: 0;
    }
    &--collapse {
      margin-left: $main-collapse;
    }
    .app-main {
      transition: margin-top 0.3s;
      margin-top: $headbar-height;
      &--isUnFold {
        margin-top: 0;
      }
    }
  }
}

.fold-enter-active,
.fold-leave-active {
  transition: transform 0.3s;
}

.fold-enter-from,
.fold-leave-to {
  transform: translateX(calc(-1 * $main-margin-left));
}

.fold-top-enter-active,
.fold-top-leave-active {
  transition: transform 0.3s, left 0.3s;
}
.fold-top-enter-from,
.fold-top-leave-to {
  transform: translateY(calc(-1 * $headbar-height));
  left: 0 !important;
}
</style>
