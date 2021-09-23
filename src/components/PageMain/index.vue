<template>
  <div class="page-main" :class="{ 'page-main--shadow': isShadow }">
    <div v-if="title || $slots.header" class="page-main__header" :style="{ 'border-bottom': headerBorder ? '1px solid #e4e7ed' : '' }">
      <div class="title">
        <slot name="header">
          <span>{{ title }}</span>
        </slot>
      </div>

      <el-row><slot name="extra" /></el-row>
    </div>
    <div v-if="content || $slots.default" :style="{ padding }">
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
  headerBorder: {
    type: Boolean,
    default: true,
  },
  padding: {
    type: String,
    default: '20px',
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
    display: flex;
    justify-content: space-between;

    .title {
      flex: 1;
      display: flex;
      align-items: center;
      > span {
        font-size: 16px;
      }
    }
  }
}
</style>
