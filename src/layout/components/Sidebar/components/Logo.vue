<script setup>
import { Camera } from '@element-plus/icons-vue'
defineProps({
  isScrollTop: Boolean,
  collapse: Boolean,
})

const title = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <router-link v-slot="{ navigate }" custom to="/">
    <div
      :class="{
        'logo--shadow': isScrollTop,
      }"
      class="logo"
      @click="navigate"
    >
      <el-icon :size="18"><Camera /></el-icon>
      <span v-if="!collapse" class="logo__title">{{ title }}</span>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
.logo {
  height: $headbar-height;
  cursor: pointer;
  text-decoration: none;
  padding: 0 10px;
  font-weight: bold;
  transition: box-shadow 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  // &--shadow {
  //   box-shadow: 0 10px 10px -10px #c7c7c7;
  // }
  &__title {
    @include text-overflow;
    margin-left: 6px;
  }
}
</style>
