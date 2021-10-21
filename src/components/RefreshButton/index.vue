<template>
  <el-tooltip effect="light" :content="content" placement="bottom">
    <el-icon role="button" :size="size" @click="$emit('click')">
      <refresh-line-icon />
    </el-icon>
  </el-tooltip>
</template>

<script>
export default {
  name: 'RefreshButton',
}
</script>

<script setup>

defineProps({
  content: {
    type: String,
    default: '刷新页面',
  },
  size: {
    type: Number,
    default: 20,
  },
})
defineEmits(['click'])
</script>
