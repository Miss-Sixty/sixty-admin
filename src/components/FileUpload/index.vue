<template>
  <el-upload v-bind="$attrs" :file-list="fileDataFormat" :before-upload="beforeUpload">
    <slot>
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </slot>
    <template #tip>
      <div class="tip" v-if="tip">{{ tip }}</div>
    </template>
  </el-upload>
</template>

<script>
export default {
  name: 'FileUpload',
}
</script>
<script setup>
import { ElMessage } from 'element-plus'
import { computed } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { isArray, isObject } from 'lodash-es'
import uploadType from '@/utils/uploadType'

const props = defineProps({
  fileList: {
    type: [Array, Object],
    default: [],
    required: true,
  },
  fileName: {
    type: String,
    default: 'name',
  },
  fileUrl: {
    type: String,
    default: 'url',
  },

  // 文件大小
  size: {
    type: Number,
    default: 8,
  },
  //提示文字
  tip: String,
})

const fileDataFormat = computed(() => {
  if (isArray(props.fileList)) return props.fileList.map(item => ({ ...item, name: item[props.fileName], url: item[props.fileUrl] }))
  if (isObject(props.fileList))
    return [{ ...props.fileList, name: props.fileList[props.fileName], url: props.fileList[props.fileUrl] }]
})

const acceptType = computed(() => {
  //如果传来为空数组，则不限制类型，否则限制传入类型
  if (props.accept) return (props.accept && props.accept.toString()) || ''

  //默认限制类型
  let arr = []
  for (const key in uploadType) {
    arr = arr.concat(uploadType[key])
  }
  return arr.toString()
})

const beforeUpload = file => {
  const isType = acceptType.value.includes(file.type)
  const isSize = file.size / 1024 / 1024 < props.size
  if (!isType) ElMessage.error('不可上传此格式文件！')
  if (!isSize) ElMessage.error(`图片大小不可超过${props.size}MB`)
  return isType && isSize
}
</script>

<style lang="scss" scoped>
.tip {
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 7px;
}
::v-deep(.el-upload) {
  vertical-align: middle;
}
</style>
