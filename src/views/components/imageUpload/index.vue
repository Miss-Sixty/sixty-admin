<template>
  <div>
    <page-header
      icon="none"
      icon-text="none"
      title="上传"
      content="二次封装 Element Plus 的上传组件，分别封装出 单图上传、多图上传、文件上传。"
    />
    <div class="page-main">
      <tools-bar title="单图上传" :reset="false" />
      <el-row :gutter="20" justify="center">
        <el-col :span="10">
          <img-upload v-model:url="url" action="/mock/upload" width="250" height="150" tip no-del />
        </el-col>
        <el-col :span="7">
          <img-upload v-model:url="url1" action="/mock/upload" />
        </el-col>
        <el-col :span="7">
          <img-upload
            v-model:url="url2"
            tip
            message="请上传 img、png 格式的图片"
            action="/mock/upload"
            :data="{
              width: 160,
              height: 160,
            }"
            @on-success="onSuccess"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const url = ref('https://picsum.photos/250/150')
const url1 = ref('https://picsum.photos/150')
const url2 = ref('')

const onSuccess = res => (url2.value = res.data)
</script>
