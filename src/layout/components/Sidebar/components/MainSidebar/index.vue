<template>
  <ul class="main-sidebar">
    <li
      v-for="(item, index) in mainRoutes"
      :key="index"
      class="main-sidebar__item"
      :class="{ 'main-sidebar__item--active': index === headerActived }"
      @click="switchActivedChange(index)"
    >
      <el-icon v-if="item.meta?.icon" :size="20">
        <component :is="item.meta?.icon" />
      </el-icon>
      <span>{{ item.meta?.title }}</span>
    </li>
  </ul>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()
const switchActivedChange = index => store.commit('menu/SWITCH_ACTIVED', index)
const headerActived = computed(() => store.state.menu.headerActived)
const mainRoutes = computed(() => store.state.menu.allRoutes)
</script>

<style lang="scss" scoped>
.main-sidebar {
  background-color: $g-main-sidebar-bg;
  color: #fff;
  user-select: none;
  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: $g-main-sidebar-width;
    width: $g-main-sidebar-width;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    &--active,
    &:hover {
      background-color: $g-main-sidebar-active-bg;
    }

    span {
      text-align: center;
      margin-top: 2px;
      @include text-overflow;
    }
  }
}
</style>
