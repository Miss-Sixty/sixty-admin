<template>
  <page-main title="多图上传" style="margin: 20px">
    <imgs-upload v-model="url" tip action="/mock/upload" width="150" height="150" @on-success="onSuccess" />
  </page-main>
</template>
<script setup>
import { ref } from 'vue'
const url = ref(['https://picsum.photos/500', 'https://picsum.photos/600'])

const onSuccess = res => url.value.push(res.data)
</script>
