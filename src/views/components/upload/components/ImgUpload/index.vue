<template>
  <div class="page-main">
    <tools-bar title="单图上传" />
    <img-upload
      v-model:url="url"
      action="/mock/upload"
      width="250"
      height="150"
      tip
      :data="{
        width: 160,
        height: 160,
      }"
      @on-success="onSuccess"
    />
  </div>
</template>
<script setup>
import { ref } from 'vue'
const url = ref('https://picsum.photos/250/150')
const onSuccess = res => (url.value = res.data)
</script>
