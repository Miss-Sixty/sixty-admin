<template>
  <div class="page-main" :class="{ 'page-main--shadow': isShadow }">
    <div v-if="title || $slots.header" class="page-main__header" :style="{ 'border-bottom': headerBorder ? '1px solid #e4e7ed' : '' }">
      <slot name="header">
        <div class="title">
          <span>{{ title }}</span>
        </div>
      </slot>
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

    .title {
      > span {
        font-size: 16px;
      }
    }
  }
}
</style>
