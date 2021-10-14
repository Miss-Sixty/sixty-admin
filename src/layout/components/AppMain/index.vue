<template>
  <main class="app-main">
    <router-view>
      <template #default="{ Component, route }">
        <transition name="main" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </template>
    </router-view>
  </main>
</template>

<style lang="scss" scoped>
.app-main {
  flex: 1;
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
