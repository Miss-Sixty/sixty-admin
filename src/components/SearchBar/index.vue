<template>
  <page-main :padding="padding">
    <el-row justify="space-between" align="middle">
      <el-space wrap style="flex: 1;">
        <el-input
          v-if="keywords !== undefined"
          :size="size"
          :placeholder="keywordsText"
          clearable
          :model-value="keywords"
          @input="val => $emit('update:keywords', val)"
          @clear="$emit('update:keywords', null)"
          @keyup.enter="$emit('on-search')"
        />
        <slot />
      </el-space>

      <div>
        <el-button :size="size" type="primary" :icon="Search" auto-insert-space @click="$emit('on-search')">搜索</el-button>
        <el-button :size="size" type="warning" :icon="RefreshLeft" auto-insert-space @click="$emit('on-reset')">重置</el-button>
      </div>
    </el-row>
  </page-main>
</template>
<script>
export default {
  name: 'SearchBar'
}
</script>
<script setup>
import { Search, RefreshLeft } from '@element-plus/icons'
defineProps({
  keywordsText: {
    type: String,
    default: '请输入搜索内容'
  },
  add: Boolean,
  keywords: [String, Number],
  status: Number,
  addText: {
    type: String,
    default: '新 增'
  },
  size: String,
  padding: {
    type: String,
    default: '20px'
  },
  searchBtn: {
    type: Boolean,
    default: false
  }
})
defineEmits(['update:keywords', 'on-search', 'on-reset'])
</script>
