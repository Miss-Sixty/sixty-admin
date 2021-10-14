<template>
  <div>
    <page-header no-icon title="文件下载" />

    <page-main style="margin: 20px" title="根据后台接口文件流下载">
      <el-button @click="handleDownByData" type="primary">文档流下载</el-button>
    </page-main>

    <page-main style="margin: 20px" title="根据文件地址下载文件">
      <el-button @click="handleDownByUrl" type="primary">文件地址下载</el-button>
    </page-main>

    <page-main style="margin: 20px" title="base64流下载">
      <el-button @click="handleDownloadByBase64" type="primary">base64流下载</el-button>
    </page-main>

    <page-main style="margin: 20px" title="图片Url下载,如果有跨域问题，需要处理图片跨域">
      <el-button @click="handleDownloadByImgUrl" type="primary">图片url下载</el-button>
    </page-main>
  </div>
</template>
<script setup>
import { downloadByData, downloadByUrl, downloadByBase64, downloadByImgUrl } from '@/hooks/useDownload'
import imgBase64 from './imgBase64'
function handleDownByData() {
  downloadByData({ data: 'text content' }, 'testName.txt')
}

function handleDownByUrl() {
  downloadByUrl({
    url: 'https://sixty-admin.oss-cn-hangzhou.aliyuncs.com/file.jpg',
  })
}

function handleDownloadByBase64() {
  downloadByBase64(imgBase64, 'logo.png')
}

function handleDownloadByImgUrl() {
  downloadByImgUrl('https://sixty-admin.oss-cn-hangzhou.aliyuncs.com/avatar.jpg', 'img.jpg')
}
</script>

<style scoped></style>
