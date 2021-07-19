<template>
  <div class="tools-bar">
    <div class="left">
      <el-input
        v-if="keywords !== undefined"
        :size="size"
        :placeholder="keywordsText"
        clearable
        :model-value="keywords"
        @input="val => $emit('update:keywords', val)"
        @clear="$emit('update:keywords', null)"
      />
      <el-select
        v-if="status !== undefined"
        :size="size"
        style="margin-bottom: 0"
        :model-value="status"
        placeholder="筛选 禁用/启用"
        clearable
        @change="val => $emit('update:status', val)"
        @clear="$emit('update:status', null)"
      >
        <el-option label="禁用" :value="0" />
        <el-option label="启用" :value="1" />
      </el-select>
      <slot />
      <el-button v-if="searchBtn" :size="size" class="search" type="primary" icon="el-icon-search" circle @click="$emit('onSearch')" />
    </div>
    <div class="right">
      <el-button v-if="add" :size="size" type="primary" @click="$emit('onAdd')">{{ addText }}</el-button>
      <slot name="btn" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'ToolsBar',
  props: {
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
  },
  emits: ['update:status', 'update:keywords', 'onAdd', 'onSearch'],
}
</script>
<style lang="scss" scoped>
.tools-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  > div {
    display: flex;
    align-items: center;

    // :deep > * {
    //   &:not(:last-child) {
    //     margin-right: 10px;
    //   }
    // }
  }

  // .left :deep > *:not(.search) {
  //   width: 190px;
  // }
}
</style>
