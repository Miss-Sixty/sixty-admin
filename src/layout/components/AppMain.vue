<script setup>
import useKeepAliveStore from '@/stores/keepAlive'
const keepAliveStore = useKeepAliveStore()
</script>

<template>
  <div>
    <router-view v-slot="{ Component, route }">
      <transition name="main" mode="out-in" appear>
        <keep-alive :include="[...keepAliveStore.list]">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
.main-enter-active {
  transition: 0.2s;
}
.main-leave-active {
  transition: 0.15s;
}
.main-enter-from {
  opacity: 0;
  margin-left: -20px;
}
.main-leave-to {
  opacity: 0;
  margin-left: 20px;
}
</style>
