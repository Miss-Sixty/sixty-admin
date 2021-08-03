<template>
  <div>
    <page-header icon="none" icon-text="none" title="复制文本">
      基于 clipboard 的二次封装，更多的功能请参考
      <el-link type="primary" href="https://clipboardjs.com/#example-target" target="_blank"> clipboard 官网 </el-link>
    </page-header>
    <div class="page-main">
      <tools-bar title="文件上传（默认最多3个）" />
      <el-input v-model="input" placeholder="请输入内容">
        <template #append>
          <el-button v-clipboard:copy="input" v-clipboard:success="successChange" v-clipboard:error="errorChange" type="primary">
            点击复制
          </el-button>
        </template>
      </el-input>
    </div>
  </div>
</template>
<script setup>
import { ElMessage } from 'element-plus'

import { ref } from 'vue'
const input = ref('这是供复制的一句话。')
const successChange = () => ElMessage.success('已复制到剪切板')
const errorChange = () => ElMessage.success('已复制到剪切板')
</script>
