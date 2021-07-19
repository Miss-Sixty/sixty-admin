<template>
  <div>
    <page-header
      icon="none"
      icon-text="none"
      title="sketch 图标"
      content="sketchSvg 文件夹中保存 sketch 生成图标，每次执行 yarn export:svg 命令会都删除文件夹并重新创建 svg。"
    />
    <div class="grid">
      <template v-for="item in sketchIcons" :key="item">
        <div class="icon-item">
          <svg-icon :name="item" />
          <span>{{ item }}</span>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { sketchIcons } from './svg-icons'
export default {
  setup() {
    return {
      sketchIcons,
    }
  },
}
</script>
<style lang="scss" scoped>
.grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));

  .icon-item {
    margin: 15px;
    text-align: center;
    font-size: 30px;

    span {
      display: block;
      font-size: 14px;
      margin-top: 4px;
    }
  }
}
</style>
