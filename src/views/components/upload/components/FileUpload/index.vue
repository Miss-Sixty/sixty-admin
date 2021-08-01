<template>
  <div class="page-main">
    <tools-bar title="文件上传（默认最多3个）" />
    <!-- <file-upload :files="files" action="/mock/upload" width="250" height="150" tip @on-success="onSuccess" /> -->
    <imgs-upload v-model:url="url" tip action="/mock/upload" width="360" height="180" @on-success="onSuccess">
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </imgs-upload>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const files = ref([
  {
    name: '测试文件.zip',
    url: 'http://xxx',
  },
  {
    name: '测试文件2.zip',
    url: 'http://xxx',
  },
])
const onSuccess = res => files.value.push({ name: '测试文件3', url: res.data })
</script>
