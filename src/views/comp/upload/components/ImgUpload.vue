<template>
  <page-main title="单图上传" style="margin: 20px">
    <img-upload
      :file-data="url"
      width="150px"
      height="150px"
      action="/mock/upload"
      @on-remove="onRemoveChange"
      @on-move="fileList => (url = fileList)"
      @on-success="onSuccessChange"
      tip="请上传 image/jpeg 、image/png 格式图片！且单张大小不超过 8MB ，建尺寸为 250*150。"
      :limit="1"
      :accept="['image/jpeg', 'image/png']"
    />
  </page-main>
</template>
<script setup>
import { ref } from 'vue'
const url = ref('https://picsum.photos/1250/1150')
const onSuccessChange = res => {
  url.value = { name: res.data, url: res.data }
}

const onRemoveChange = (file, fileList) => {
  url.value = fileList
}
</script>
