<template>
  <div>
    <page-header
      icon="none"
      icon-text="none"
      title="上传"
      content="二次封装 Element Plus 的上传组件，分别封装出 单图上传、多图上传、文件上传。"
    />
    <el-alert
      title="上传图片时进度条没有进度的原因是因为数据请求使用mock假数据，改成正式服务器后就能看到完美的进度条了。"
      type="warning"
      effect="dark"
      show-icon
    />
    <img-upload />
    <imgs-upload />
  </div>
</template>
<script setup>
import ImgUpload from './components/ImgUpload'
import ImgsUpload from './components/ImgsUpload'
</script>
