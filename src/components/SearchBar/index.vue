<template>
  <page-main style="margin: 20px" :header-border="false">
    <template #header>
      <el-space wrap>
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
    </template>
    <template #extra>
      <div>
        <el-button type="primary" icon="el-icon-search" @click="$emit('on-search')">搜 索</el-button>
        <el-button type="warning" icon="el-icon-refresh-right" @click="$emit('on-reset')">重 置</el-button>
      </div>
    </template>
  </page-main>
</template>
<script>
export default {
  name: 'SearchBar',
}
</script>
<script setup>

defineProps({
  keywordsText: {
    type: String,
    default: '请输入搜索内容',
  },
  add: Boolean,
  keywords: [String, Number],
  status: Number,
  addText: {
    type: String,
    default: '新 增',
  },
  size: String,
  margin: String,
  searchBtn: {
    type: Boolean,
    default: false,
  },
})
defineEmits(['update:keywords', 'on-search', 'on-reset'])
</script>
