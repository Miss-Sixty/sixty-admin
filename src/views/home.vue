<template>
  <div>
    <page-header
      no-icon
      :title="`欢迎使用 ${title}`"
      content="这是一款中后台前端解决方案，基于 Vue3 和 Element Plus
    实现。使用了最新的前端技术栈，有许多语法和工具库还处于测试阶段或刚刚推出，因此该项目不适合没有经验的开发人员直接使用在生产环境，它更适合用来探索最新技术栈或学习管理系统的整个处理流程。"
    >
      <template #extra>
        <el-button-group>
          <el-button
            type="primary"
            @click="toUrl('https://miss-sixty.github.io/sixty-admin-docs/')"
          >项目文档</el-button>
          <el-button type="primary" @click="toUrl('https://github.com/Miss-Sixty/sixty-admin')">代码仓库</el-button>
        </el-button-group>
      </template>
    </page-header>

    <!-- <page-main title="更新日志" padding="0 20px 20px" style="margin-bottom: 20px">
          <div v-html="markdownText" />
    </page-main>-->

    <page-main style="width: 500px;">
      <template #header>
        <el-row justify="space-between" align="middle">
          <span style="font-size: 16px">版本信息</span>
          <el-tag>部署时间：{{ updateTime }}</el-tag>
        </el-row>
      </template>

      <el-descriptions border :column="2">
        <el-descriptions-item label="Vue">{{ dependencies['vue'] }}</el-descriptions-item>
        <el-descriptions-item label="Vue Router">{{ dependencies['vue-router'] }}</el-descriptions-item>
        <el-descriptions-item label="Pinia">{{ dependencies['pinia'] }}</el-descriptions-item>
        <el-descriptions-item label="Element Plus">{{ dependencies['element-plus'] }}</el-descriptions-item>
        <el-descriptions-item label="Axios">{{ dependencies['axios'] }}</el-descriptions-item>
        <el-descriptions-item label="VueUse">{{ dependencies['@vueuse/core'] }}</el-descriptions-item>
      </el-descriptions>
    </page-main>
  </div>
</template>
<script setup>
import { dependencies } from '../../package.json'
import { useSettingStore } from '@/store/modules/setting'
// import marked from 'marked'
// import changelog from '../../CHANGELOG.md'

const { title, updateTime } = useSettingStore()
const toUrl = url => window.open(url)

// const renderer = new marked.Renderer()
// renderer.link = (href, title, text) => {
//   return '<a href="' + href + '" title="' + text + '" target="_blank" style="color:#409eff">' + text + '</a>'
// }
// const markdownText = marked(changelog, {
//   renderer,
// })
</script>
