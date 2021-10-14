<template>
  <div>
    <page-header no-icon title="上传" content="使用 Element Plus 的上传组件，二次封装出 图片上传、文件上传组件。" />
    <el-alert
      title="上传图片时进度条没有进度的原因是因为数据请求使用mock假数据，改成正式服务器后就能看到完美的进度条了。"
      type="warning"
      effect="dark"
      show-icon
    />
    <img-upload />
    <imgs-upload />
    <file-upload />
  </div>
</template>
<script setup>
import ImgUpload from './components/ImgUpload.vue'
import ImgsUpload from './components/ImgsUpload.vue'
import FileUpload from './components/FileUpload.vue'
</script>
