<template>
  <page-main title="单图上传" style="margin: 20px">
    <imgs-upload
      v-model="url"
      action="/mock/upload"
      width="250"
      height="150"
      :limit="1"
      :data="{
        width: 250,
        height: 150,
      }"
      tip="请上传 image/jpeg 、image/png 格式图片！且单张大小不超过 2MB ，建尺寸为 250*150。"
      @on-success="onSuccess"
    />
  </page-main>
</template>
<script setup>
import { ref } from 'vue'
const url = ref(['https://picsum.photos/250/150'])
const onSuccess = res => url.value.push(res.data)
</script>
