<script setup>
import { useMenuStore } from '@/stores/menu'
import { useSettingsStore } from '@/stores/setting'
import { useRouter } from 'vue-router'
const router = useRouter()
const settingsStore = useSettingsStore()
const menuStore = useMenuStore()

const switchActivedChange = (index) => {
  menuStore.headerActived = index
  const [onePage] = menuStore.allRoutes[index].children
  router.push({ name: onePage.name })
}
</script>

<template>
  <div class="sidebar-main" v-if="settingsStore.sidebar.alwaysShowSidebarMain || !menuStore.allRoutes.length">
    <div
      v-for="(item, index) in menuStore.allRoutes"
      :key="index"
      class="sidebar-main__item"
      :class="{ 'sidebar-main__item--active': index === menuStore.headerActived }"
      @click="switchActivedChange(index)"
    >
      <el-icon :size="20" v-if="item.meta?.icon">
        <component :is="item.meta.icon" />
      </el-icon>
      <span>{{ item.meta?.title }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-main {
  width: $sidbar-main-width;
  background-color: $sidbar-main-bg;
  color: #fff;
  padding: 0 5px;
  text-align: center;
  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    padding: 6px 0;
    margin: 5px 0;
    transition: background-color 0.3s;
    font-size: 14px;
    cursor: pointer;
    &--active,
    &:hover {
      background-color: var(--el-color-primary);
    }

    .icon {
      height: 20px;
    }

    span {
      margin-top: 4px;
      text-align: center;
      line-height: 1;
      @include text-overflow;
    }
  }
}
</style>
