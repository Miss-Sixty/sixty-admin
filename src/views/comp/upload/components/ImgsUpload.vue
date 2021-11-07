<template>
  <page-main title="多图上传" style="margin: 20px">
    <p style="margin: 0 0 20px">图片id：{{ imgIds }}</p>
    <img-upload
      v-model="fileList"
      width="160px"
      height="160px"
      action="/mock/upload"
      @on-change="onChange"
      tip="请上传 image/jpeg 、image/png 格式图片！且单张大小不超过 8MB ，建尺寸为 250*150。"
      :limit="3"
      :accept="['image/jpeg', 'image/png']"
    />
  </page-main>
</template>
<script setup>
import { ref } from 'vue'
const fileList = ref([
  { id: 1, name: 1, url: 'https://picsum.photos/960/720' },
  { id: 2, name: 2, url: 'https://picsum.photos/970/650' },
])
const imgIds = ref([])

const onChange = fileList => {
  console.log(fileList)
  imgIds.value = fileList.map(item => item.id || item.response.data.id)
}
</script>
