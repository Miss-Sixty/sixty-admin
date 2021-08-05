<template>
  <div>
    <page-header icon="none" icon-text="none" title="Icon 图标">
      <p>Icon 的使用方法跟 element-plus 中 svg 的使用方法完全一致，并自动注册为全局，无需额外引入。</p>
    </page-header>
    <div class="grid">
      <template v-for="item in name" :key="item">
        <div class="icon-item">
          <el-icon :size="40">
            <component :is="item" />
          </el-icon>
          <span>{{ item }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import name from './svg-icons'
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
