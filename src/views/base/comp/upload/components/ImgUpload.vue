<template>
  <page-main title="单图上传" style="margin: 20px">
    <p style="margin: 0 0 10px">图片id：{{ imgId }}</p>
    <img-upload
      v-model="fileList"
      width="240px"
      height="160px"
      action="/mock/upload"
      @on-change="onChange"
      tip="请上传 image/jpeg 、image/png 格式图片！且单张大小不超过 8MB ，建尺寸为 250*150。"
      :limit="1"
      :accept="['image/jpeg', 'image/png']"
      icon-size="30px"
    />
  </page-main>
</template>
<script setup>
import { ref } from 'vue'
const fileList = ref({ id: 1, name: 1, url: 'https://picsum.photos/970/720' })
const imgId = ref(null)

const onChange = fileList => {
  console.log(fileList)
  const [fileData] = fileList.map(item => item.id || item.response.data.id)
  imgId.value = fileData
}
</script>
