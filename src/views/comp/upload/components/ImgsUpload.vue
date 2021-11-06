<template>
  <page-main title="多图上传" style="margin: 20px">
    <img-upload
      :file-data="url"
      width="240px"
      height="160px"
      action="/mock/upload"
      @on-remove="onRemoveChange"
      @on-move="fileList => (url = fileList)"
      @on-success="onSuccessChange"
      tip="请上传 image/jpeg 、image/png 格式图片！且单张大小不超过 8MB ，建尺寸为 250*150。"
      :limit="3"
      :accept="['image/jpeg', 'image/png']"
      icon-size="30px"
    />
  </page-main>
</template>
<script setup>
import { ref } from 'vue'
const url = ref(['https://picsum.photos/960/720', 'https://picsum.photos/970/650'])
const onSuccessChange = res => {
  url.value = { name: res.data, url: res.data }
}

const onRemoveChange = (file, fileList) => {
  url.value = fileList
}
</script>
