<template>
  <div>
    <page-header icon="none" icon-text="none" title="富文本编辑器">
      基于 <el-link type="primary" href="https://www.wangeditor.com/" target="_blank"> wangEditor </el-link> 的二次封装
    </page-header>
    <div class="page-main">
      <tools-bar title="编辑器" />
      <wang-editor v-model="text" />
    </div>

    <div class="page-main">
      <tools-bar title="预览" />
      <div :innerHTML="text" />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const text = ref(`
<h1>为何选择 wangEditor</h1>
<ul>
    <li>简洁、轻量级、文档齐全</li>
    <li>万星项目 Github Star 1w+</a></li>
    <li>npm 周下载量 1w+</li>
    <li>CDN 月下载量百万+</li>
</ul>`)
</script>
