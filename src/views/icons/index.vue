<template>
  <div>
    <page-header icon="none" icon-text="none" :title="data.title" :content="data.content" />
    <div class="grid">
      <template v-for="item in data.list" :key="item">
        <div class="icon-item">
          <svg-icon :name="item" />
          <span>{{ item }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { sketchIcons, svgIcons } from './svg-icons'
import { defineProps, computed } from 'vue'
const props = defineProps({
  type: String,
})

const obj = {
  sketch: {
    title: 'Sketch 图标',
    content:
      'SketchSvg 文件夹中保存 sketch 生成图标，每次执行 yarn export:svg 或 npm run export:svg 命令会都删除文件夹并重新创建 svg 。',
    list: sketchIcons,
  },
  svg: {
    title: 'SVG 图标',
    content: '你也可以使用自己的 SVG 图标，只需把 svg 图标复制到 @/icons/svg 文件夹下即可。',
    list: svgIcons,
  },
}

const data = computed(() => obj[props.type])
</script>

<style lang="scss" scoped>
.grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  margin: 20px;
  border-radius: 4px;
  overflow: hidden;

  .icon-item {
    margin: 10px;
    text-align: center;
    font-size: 30px;
    background-color: #fff;
    border-radius: 5px;
    padding: 10px;

    span {
      display: block;
      font-size: 14px;
      margin-top: 4px;
    }
  }
}
</style>
