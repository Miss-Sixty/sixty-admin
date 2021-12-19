<template>
  <el-scrollbar
    ref="scrollbarRef"
    class="app-main"
    view-class="scrollbar"
    wrap-class="wrap-class"
    @scroll="scroll => $emit('on-scroll', !!scroll.scrollTop)"
  >
    <transition name="fade">
      <div v-show="settingStore.maximize" class="maximize" @click="settingStore.fullScreen">
        <el-icon class="icon"><close-bold /></el-icon>
      </div>
    </transition>
    <router-view>
      <template #default="{ Component, route }">
        <transition name="main" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </template>
    </router-view>
    <footer-bar v-show="copyright" />
  </el-scrollbar>
</template>

<script setup>
import FooterBar from '../FooterBar/index.vue'
import { useRoute } from 'vue-router'
import { watch, ref } from 'vue'
import { useSettingStore } from '@/store/modules/setting'
import { CloseBold } from '@element-plus/icons'
defineEmits(['on-scroll'])
const settingStore = useSettingStore()
const scrollbarRef = ref()
const route = useRoute()

// 是否显示尾部
const copyright = ref(false)
watch(
  () => route.meta?.copyright,
  val => (copyright.value = val === undefined ? settingStore.showCopyright : val),
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.app-main {
  flex: 1;
  background-color: var(--el-bg-color);
  position: relative;
  transition: padding-top 0.3s, margin-left 0.3s;
  ::v-deep(.scrollbar) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
  }
  ::v-deep(.wrap-class) {
    display: flex;
    flex-direction: column;
  }
  .maximize {
    position: absolute;
    left: -40px;
    top: -40px;
    width: 80px;
    height: 80px;
    z-index: 1000;
    border-radius: 50%;
    background-color: #f56c6c;
    cursor: pointer;
    transition: background-color 0.3s, opacity 0.3s;
    &:hover {
      background-color: #f78989;
    }
    .icon {
      position: absolute;
      bottom: 16px;
      right: 18px;
      color: #fff;
    }
  }
}
.main-leave-active,
.main-enter-active {
  transition: all 0.25s;
}
.main-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.main-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
