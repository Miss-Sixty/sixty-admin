<template>
  <el-upload v-bind="$attrs" :file-list="fileDataFormat" :drag="drag"   :on-success="onSuccessChange">
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
import { UploadFilled } from '@element-plus/icons'
import { isString, isArray, isObject } from 'lodash-es'

const emit = defineEmits(['update:url', 'on-success'])

const props = defineProps({
  fileList: {
    type: [Array, Object, String],
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
  limit: Number,
  drag: Boolean,
})

const fileDataFormat = computed(() => {
  if (isString(props.fileList)) return [{ name: props.fileList, url: props.fileList }]
  if (isArray(props.fileList))
    return props.fileList.map(item => {
      if (isString(item)) return { name: item, url: item }
      return { ...item, name: item[props.fileName], url: item[props.fileUrl] }
    })
  if (isObject(props.fileList)) return [{ name: props.fileList[props.fileName], url: props.fileList[props.fileUrl] }]
})

const onSuccessChange = (res, file, fileList) => {
  console.log(res, file, fileList)
}

// const beforeUpload = file => {
//   const isType = acceptType.value.includes(file.type)
//   const isSize = file.size / 1024 / 1024 < props.size

//   if (!isType) {
//     ElMessage.error('不可上传此格式文件！')
//   }
//   if (!isSize) {
//     ElMessage.error(`图片大小不可超过${props.size}MB`)
//   }
//   if (isType && isSize) {
//     state.preview = URL.createObjectURL(file)
//   }

//   return isType && isSize
// }
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
