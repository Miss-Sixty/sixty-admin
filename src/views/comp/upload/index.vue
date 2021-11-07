<template>
  <div>
    <page-header no-icon title="上传" content="使用 Element Plus 的上传组件，二次封装出 图片上传、文件上传组件。" />
    <img-upload />
    <imgs-upload />
    <file-button-upload />
    <file-upload />
  </div>
</template>
<script setup>
import ImgUpload from './components/ImgUpload.vue'
import ImgsUpload from './components/ImgsUpload.vue'
import FileButtonUpload from './components/FileButtonUpload.vue'
import FileUpload from './components/FileUpload.vue'
</script>
