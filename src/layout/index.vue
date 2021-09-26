<template>
  <div class="layout">
    <transition @before-enter="beforeEnter" @enter="enter" @leave="leave" :css="false">
      <sidebar class="sidebar" v-show="getIsUnFold" :style="{ width: sidbarWidth }" />
    </transition>
    <div class="right" :style="{ 'margin-left': getIsUnFold ? sidbarWidth : 0 }">
      <transition name="fold-top">
        <head-bar v-show="getIsUnFold" class="head-bar" :style="{ left: sidbarWidth }" />
      </transition>
      <app-main class="app-main" :class="{ 'app-main--isUnFold': !getIsUnFold }" />
      <footer-bar v-show="copyright" />
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar'
import HeadBar from './components/HeadBar'
import AppMain from './components/AppMain'
import FooterBar from './components/FooterBar'
import { computed, watch, ref } from 'vue'
import { useSettingStore } from '@/store/modules/setting'
import { useRoute } from 'vue-router'
import variables from '@/styles/resources/var.scss'
import { useMenuStore } from '@/store/modules/menu'

const route = useRoute()
const settingStore = useSettingStore()
const menuStore = useMenuStore()

//是否显示尾部
const copyright = ref(false)
watch(
  () => route.meta?.copyright,
  val => (copyright.value = val === undefined ? settingStore.showCopyright : val),
  { immediate: true }
)

const getIsUnFold = computed(() => settingStore.menuSetting.show && settingStore.headerSetting.show)
const collapse = computed(() => settingStore.collapse)

//是否有主侧边栏
const isMainMenu = computed(() => menuStore.allRoutes > 1 || settingStore.alwaysShowMainSidebar)

const sidbarWidth = computed(() => {
  if (collapse.value) {
    //有主侧边栏的收起宽度
    return isMainMenu.value ? variables.sidbarCollapseWidth : variables.navmenuCollapseWidth
  } else {
    //有主侧边栏的展开宽度
    return isMainMenu.value ? variables.sidbarWidth : variables.navmenuWidt
  }
})

//侧边栏收起展开过渡动画
function beforeEnter(el) {
  el.style.transform = `translateX(calc(-1 *${sidbarWidth.value}))`
}

function enter(el) {
  el.offsetWidth
  el.style.transform = 'translateX(0)'
  el.style.transition = 'transform 0.3s ease-in-out,width 0.3s ease-in-out'
}
function leave(el, done) {
  el.style.transform = `translateX(calc(-1 *${sidbarWidth.value}))`
  el.style.transition = 'transform 0.3s ease-in-out,width 0.3s ease-in-out'
  setTimeout(done, 300)
}
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;

  .sidebar {
    display: flex;
    box-shadow: 10px 0 10px -10px #c7c7c7;
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 2;
    transition: width 0.3s ease-in-out;
  }

  .head-bar {
    position: fixed;
    right: 0;
    transition: left 0.3s ease-in-out, transform 0.3s ease-in-out;
  }

  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: margin-left 0.3s ease-in-out;
    height: 100%;
    overflow-y: auto;

    .app-main {
      transition: margin-top 0.3s ease-in-out;
      margin-top: $headbar-height;
      &--isUnFold {
        margin-top: 0;
      }
    }
  }
}

.fold-top-leave-active {
  left: 0 !important;
}
.fold-top-enter-from,
.fold-top-leave-to {
  left: 0 !important;
  transform: translateY(calc(-1 * $headbar-height));
}
</style>
