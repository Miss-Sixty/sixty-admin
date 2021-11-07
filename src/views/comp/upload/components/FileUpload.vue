<template>
  <page-main title="文件上传（默认最多3个）" style="margin: 20px">
    <file-upload drag :file-list="files" action="/mock/upload" tip @on-success="onSuccess" />
    <file-upload :file-list="files" action="/mock/upload" tip @on-success="onSuccess" >
      <el-button>click</el-button>
    </file-upload>
  </page-main>
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
