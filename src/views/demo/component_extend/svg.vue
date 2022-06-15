<script setup>
import { Danta, Dangao, Hupijuan, Kafei } from '@/icons'
</script>

<template>
  <div>
    <p>SVG Icon</p>
    <el-card>
      <el-space wrap>
        <el-icon :size="60"><Danta /></el-icon>
        <el-icon :size="60"><Dangao /></el-icon>
        <el-icon :size="60"><Hupijuan /></el-icon>
        <el-icon :size="60"><Kafei /></el-icon>
      </el-space>
      <p>使用方法：</p>
      <ol>
        <li>将 svg 文件放入 @/src/icons/svg 目录下，大些首字母的文件名即为引入名称</li>
        <li>执行 pnpm gen:svg 后即可使用</li>
      </ol>
    </el-card>
  </div>
</template>

<style scoped>
.example-icon {
  font-size: 48px;
}
</style>
