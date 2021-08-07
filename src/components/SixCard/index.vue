<template>
  <div class="six-card" :style="styles">
    <slot name="title-bar">
      <el-row v-if="title || $slots.btn" class="title-bar" justify="space-between" align="middle">
        <div>
          <slot name="title">
            <p v-if="title" class="title">{{ title }}</p>
          </slot>
        </div>
        <el-row justify="space-between" align="middle">
          <slot name="btn" />
        </el-row>
      </el-row>
    </slot>
    <div v-if="$slots.default" class="content" :style="{ padding: props.contentPadding }">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'SixCard',
}
</script>

<script setup>
import { defineProps, computed } from 'vue'
const props = defineProps({
  margin: {
    type: String,
    default: '20px',
  },
  padding: {
    type: String,
    default: '20px',
  },
  bgColor: {
    type: String,
    default: '#fff',
  },
  radius: {
    type: String,
    default: '4px',
  },
  title: String,
  contentPadding: {
    type: String,
    default: '0',
  },
})

const styles = computed(() => {
  const { margin, padding, bgColor, radius } = props
  return {
    margin,
    backgroundColor: bgColor,
    bordeRadius: radius,
    padding: padding,
  }
})
</script>
<style lang="scss" scoped>
.six-card {
  overflow: hidden;
  flex-wrap: nowrap;
  .title-bar {
    .title {
      font-size: 16px;
      font-weight: 700;
      margin: 0;
      line-height: 1;
    }
  }
}
</style>
