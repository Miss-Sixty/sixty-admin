<template>
  <page-header
    no-icon
    :title="`欢迎使用 ${title}`"
    content="这是一款中后台前端解决方案，基于 Vue3 和 Element Plus
    实现。使用了最新的前端技术栈，有许多语法和工具库还处于测试阶段或刚刚推出，因此该项目不适合没有经验的开发人员直接使用在生产环境，它更适合用来探索最新技术栈或学习管理系统的整个处理流程。"
  >
    <template #extra>
      <el-button-group size="small">
        <el-button type="primary">项目文档</el-button>
        <el-button type="primary">代码仓库 </el-button>
      </el-button-group>
    </template>
  </page-header>
</template>
<script setup>
import { useSettingStore } from '@/store/modules/setting'
const { title } = useSettingStore()
</script>
