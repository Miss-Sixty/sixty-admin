<template>
  <div class="main" v-if="alwaysShowMainSidebar || !mainRoutes.length">
    <div
      v-for="(item, index) in mainRoutes"
      :key="index"
      class="main__item"
      :class="{ 'main__item--active': index === headerActived }"
      @click="switchActivedChange(index)"
      role="button"
    >
      <component class="icon" v-if="item.meta?.icon" :is="item.meta?.icon" />
      <span>{{ item.meta?.title }}</span>
    </div>
  </div>
</template>

<script setup>
import { useMenuStore } from '@/store/modules/menu'
import { useSettingStore } from '@/store/modules/setting'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const menuStore = useMenuStore()
const settingStore = useSettingStore()
const headerActived = computed(() => menuStore.headerActived)
const mainRoutes = computed(() => menuStore.allRoutes)
const alwaysShowMainSidebar = settingStore.alwaysShowMainSidebar

const switchActivedChange = index => {
  menuStore.headerActived = index
  const [onePage] = mainRoutes.value[index]?.children
  if (onePage) router.push({ name: onePage.name, path: onePage.path })
}
</script>

<style lang="scss" scoped>
.main {
  background-color: #1f2d3d;
  color: #fff;
  width: $main-sidbar-width;
  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 5px auto;
    width: 54px;
    height: 54px;
    border-radius: 5px;
    transition: background-color 0.3s;
    &--active,
    &:hover {
      background-color: #409eff;
    }

    .icon {
      height: 20px;
    }

    span {
      margin-top: 2px;
      text-align: center;
      @include text-overflow;
    }
  }
}
</style>
