<template>
  <page-main title="文件上传（默认最多3个）" style="margin: 20px">
    <p style="margin: 0 0 10px">文件id：{{ fileIds }}</p>
    <file-upload
      :file-list="files"
      action="/mock/upload"
      tip="单个文件大小不超过 2MB，且文件数量不超过 3 个"
      :on-success="onSuccessChange"
      :on-remove="onRemoveChange"
    >
      <el-button type="primary">上传文件</el-button>
    </file-upload>
  </page-main>
</template>
<script setup>
import { ref } from 'vue'
const files = ref([
  {
    name: '测试文件.zip',
    url: 'http://xxx',
    id: 1,
  },
  {
    name: '测试文件2.zip',
    url: 'http://xxx',
    id: 2,
  },
])

const fileIds = ref([1, 2])
const onSuccessChange = (res, file, fileList) => {
  console.log(fileList)
  fileIds.value = fileList.map(item => item.id || item.response.data.id)
}
const onRemoveChange = (file, fileList) => {
  console.log(fileList)
  fileIds.value = fileList.map(item => item.id || item.response.data.id)
}
</script>
