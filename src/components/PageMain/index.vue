<template>
  <div class="page-main" :class="{ 'page-main--shadow': isShadow }">
    <div v-if="title || $slots.header" class="page-main__header">
      <slot name="header">
        <span>{{ title }}</span>
        <slot name="extra" />
      </slot>
    </div>
    <div v-if="content || $slots.default" class="page-main__body">
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PageMain',
}
</script>
<script setup>
import { defineProps, defineEmits } from 'vue'
defineEmits(['click'])
defineProps({
  title: String,
  content: String,
  isShadow: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
.page-main {
  border-radius: 4px;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: var(--el-transition-duration);

  &--shadow {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  &__header {
    padding: 16px 20px;
    border-bottom: 1px solid #e4e7ed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > span {
      font-size: 16px;
    }
  }
  &__body {
    padding: 20px;
  }
}
</style>
