<template>
  <div class="appmain">
    <router-view v-slot="{ Component, route }">
      <transition name="main" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
.appmain {
  flex: 1;
  background: $appmain-bg;
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
</style>
