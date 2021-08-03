<template>
  <div class="page-main">
    <tools-bar title="文件上传（默认最多3个）" />

    <el-space alignment="flex-top" :size="30">
      <file-upload drag :files="files" action="/mock/upload" tip @on-success="onSuccess" />

      <file-upload :files="files" action="/mock/upload" tip @on-success="onSuccess">
        <el-button size="small" type="primary">点击上传</el-button>
      </file-upload>
    </el-space>
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
const onSuccess = (res, file, fileList) => {
  console.log(res)
  console.log(file)
  console.log(fileList)
}
</script>
