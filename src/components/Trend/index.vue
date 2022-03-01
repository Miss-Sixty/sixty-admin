<template>
  <div :class="`trend ${isUp ? 'up' : 'down'}`">
    <span v-if="prefix" class="prefix">{{ prefix }}</span>
    <span class="text">{{ value }}</span>
    <span v-if="suffix" class="suffix">{{ suffix }}</span>
    <el-icon class="icon">
      <component :is="isUp ? CaretBottom : CaretTop" />
    </el-icon>
  </div>
</template>

<script>
export default {
  name: 'Trend',
}
</script>

<script setup>
import { computed } from 'vue'
import { CaretBottom, CaretTop } from '@element-plus/icons-vue'

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    validator: val => ['up', 'down'].includes(val),
    default: 'up',
  },
  prefix: String,
  suffix: String,
  reverse: {
    type: Boolean,
    default: false,
  },
})

const isUp = computed(() => {
  let isUp = props.type === 'up'
  if (props.reverse) {
    isUp = !isUp
  }
  return isUp
})
</script>

<style lang="scss" scoped>
.trend {
  display: inline-flex;
  align-items: center;
  font-size: 16px;
  &.up {
    color: #67c23a;
  }
  &.down {
    color: #f56c6c;
  }
  .icon {
    margin-left: 5px;
    font-size: 16px;
  }
}
</style>
