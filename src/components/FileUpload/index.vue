<template>
  <el-upload
    :action="action"
    :data="data"
    :name="name"
    :before-upload="beforeUpload"
    :on-exceed="onExceed"
    :on-success="onSuccess"
    :file-list="props.files"
    :limit="props.limit"
    drag
  >
    <div class="slot">
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </div>
    <template #tip>
      <p v-if="props.tip" class="tip">
        <i class="el-icon-info" />
        {{ tipText }}
      </p>
    </template>
  </el-upload>
</template>

<script>
export default {
  name: 'FileUpload',
}
</script>
<script setup>
import _isBoolean from 'lodash/isBoolean'
import { ElMessage } from 'element-plus'
import { defineProps, computed, defineEmits } from 'vue'
const emit = defineEmits(['update:url', 'on-success'])

const props = defineProps({
  //限制接受的文件类型
  accept: String,
  action: {
    type: String,
    required: true,
  },
  headers: {
    type: Object,
    default: () => {},
  },
  data: {
    type: Object,
    default: () => {},
  },
  name: {
    type: String,
    default: 'file',
  },
  files: {
    type: Array,
    default: () => [],
  },
  // 文件大小
  size: {
    type: Number,
    default: 2,
  },
  placeholder: {
    type: String,
    default: '',
  },
  //是否显示提示栏
  tip: [Boolean, String],
  //文件类型错误的提示文案
  message: String,
  ext: {
    type: Array,
    default: () => ['image/jpeg', 'image/png'],
  },
  noDel: Boolean,
  limit: {
    type: [Boolean, Number],
    default: 3,
  },
})

const message = computed(() => props.message || `请上传 ${props.ext.join(' 、')} 格式图片！`)

const tipText = computed(() => {
  const { tip, size, ext, width, height } = props
  if (_isBoolean(tip)) return `${message.value}且大小不超过 ${size}MB ，建尺寸为 ${width}*${height} 。`
  return tip
})

const beforeUpload = file => {
  console.log(file)
  const isType = props.ext.includes(file.type)
  const isSize = file.size / 1024 / 1024 < props.size
  if (!isType) {
    ElMessage.error(message.value)
  }
  if (!isSize) {
    ElMessage.error(`上传图片大小不能超过 ${props.size}MB！`)
  }

  return isType && isSize
}

const onExceed = () => {
  ElMessage.warning('文件上传超过限制')
}

const onSuccess = (res, file) => {
  emit('on-success', res, file)
}
</script>
<style lang="scss" scoped>
.tip {
  margin: 5px 0 0;
  background-color: #f4f4f5;
  padding: 8px 16px;
  color: #909399;
  border-radius: 4px;
  display: inline-block;
}
</style>
