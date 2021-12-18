<template>
  <page-main title="文件上传（默认最多3个）" style="margin: 20px;">
    <p style="margin: 0 0 10px;">文件id：{{ fileIds }}</p>
    <files-upload
      v-model:files="files" 
      :list-field="{
        name:'fileName',
        url:'fileUrl',
        id:'fileId'
      }"
      list-type="picture"
      action="/mock/upload" 

      @on-change="onChange"
    />
  </page-main>
</template>
<script setup>
import { ref } from 'vue'
const files = ref([
  {
    fileName: '测试文件.zip',
    fileUrl: 'http://xxx',
    fileId: 1
  },
  {
    fileName: '测试文件2.zip',
    fileUrl: 'http://xxx',
    fileId: 2
  }
])

const fileIds = ref([1, 2])

const onChange = (res, file, fileList) => {
  console.log(fileList)
  fileIds.value = fileList.map(item => item.id || item.response.data.id)
}

</script>
