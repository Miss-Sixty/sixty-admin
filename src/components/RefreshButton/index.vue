<template>
  <el-tooltip :content="content" :placement="placement">
    <slot><el-button :icon="Refresh" size="small" circle @click="$emit('click')" /></slot>
  </el-tooltip>
</template>

<script>
export default {
  name: 'RefreshButton',
}
</script>

<script setup>
import { Refresh } from '@element-plus/icons-vue'
defineProps({
  content: {
    type: String,
    default: '刷新页面',
  },
  size: {
    type: Number,
    default: 20,
  },
  placement: {
    type: String,
    default: 'bottom',
  },
})
defineEmits(['click'])
</script>
