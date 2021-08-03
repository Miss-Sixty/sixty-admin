<template>
  <div>
    <page-header icon="none" icon-text="none" title="复制文本">
      基于 clipboard 的二次封装，更多的功能请参考
      <el-link type="primary" href="https://clipboardjs.com/#example-target" target="_blank"> clipboard 官网 </el-link>
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
const successChange = () => ElMessage.success('已复制到剪切板')
const errorChange = () => ElMessage.success('复制错误，请重试！')
</script>
