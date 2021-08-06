<template>
  <div>
    <page-header icon="none" icon-text="none" title="文本复制">
      基于
      <el-link type="primary" href="https://github.com/feross/clipboard-copy" target="_blank"> clipboard-copy </el-link>
      的二次封装。
    </page-header>

    <div class="page-main">
      <el-input v-model="input" placeholder="请输入内容" type="textarea" :rows="3" />
      <el-button
        v-clipboard="input"
        v-clipboard:success="successChange"
        v-clipboard:error="errorChange"
        type="primary"
        style="margin-top: 20px"
      >
        点击复制
      </el-button>
    </div>
  </div>
</template>
<script setup>
import { ElMessage } from 'element-plus'

import { ref } from 'vue'
const input = ref('连雨不知春去，一晴方觉夏深。')
const successChange = res => ElMessage.success(res)
const errorChange = res => ElMessage.error(res)
</script>
