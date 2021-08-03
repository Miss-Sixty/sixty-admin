<template>
  <div class="page-main">
    <tools-bar title="多图上传" :reset="false" />
    <imgs-upload v-model="url" tip action="/mock/upload" width="150" height="150" @on-success="onSuccess" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
const url = ref(['https://picsum.photos/500', 'https://picsum.photos/600'])

const onSuccess = res => url.value.push(res.data)
</script>
