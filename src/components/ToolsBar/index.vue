<template>
  <el-row type="flex" justify="space-between" align="middle" class="tools-bar">
    <slot>
      <p>{{ title }}</p>
    </slot>
    <el-row type="flex" justify="end" align="middle">
      <el-button v-if="add" size="small" icon="el-icon-plus" type="primary" @click="$emit('onAdd')">
        {{ addText }}
      </el-button>

      <slot name="btn" />
      <el-tooltip v-if="reset" effect="light" :content="refreshText" placement="bottom">
        <div class="headbar__icon">
          <svg-icon name="refresh-line" @click="$emit('reset')" />
        </div>
      </el-tooltip>
    </el-row>
  </el-row>
</template>
<script>
export default {
  name: 'ToolsBar',
  props: {
    add: Boolean,
    title: {
      type: String,
      default: '表格列表',
    },
    addText: {
      type: String,
      default: '新 增',
    },
    reset: Boolean,
    refreshText: {
      type: String,
      default: '刷新表格数据',
    },
  },
  emits: ['onAdd', 'reset'],
}
</script>
<style lang="scss" scoped>
.tools-bar {
  margin-bottom: 20px;
  p {
    font-size: 16px;
    font-weight: 700;
    margin: 0;
  }
  .headbar__icon {
    margin-left: 5px;
    padding: 0 5px;
    cursor: pointer;
    font-size: 20px;
  }
}
</style>
