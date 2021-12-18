<template>
  <div>
    <page-header no-icon title="Icon 图标" :content="data.content" />
    <div class="grid">
      <div v-for="item in data.list" :key="item" class="icon-item">
        <el-icon :size="40">
          <component :is="item" />
        </el-icon>
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { svgIcons, sketchIcons } from './svg-icons'
import { computed } from 'vue'
const props = defineProps({
  type: {
    type: String,
    default: 'svg'
  }
})
const obj = {
  svg: {
    title: 'SVG 图标',
    content: '你也可以使用自己的 SVG 图标，只需把 svg 图标复制到 @/icons/svg 文件夹后执行 yarn gen:svg 来自动创建图标组件。',
    list: svgIcons
  },
  sketch: {
    title: 'Sketch 图标',
    content:
      '@/assets/scetch 中保存 sketch 图标文件，执行 yarn export:svg 会都导出为 svg 。然后执行 yarn gen:svg 来自动创建图标组件。',
    list: sketchIcons
  }
}
const data = computed(() => obj[props.type])
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  .icon-item {
    margin: 10px;
    text-align: center;
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
    span {
      display: block;
      margin-top: 4px;
    }
  }
}
</style>
