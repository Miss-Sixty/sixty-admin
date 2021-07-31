<template>
  <el-upload
    :action="props.action"
    :show-file-list="false"
    :headers="props.headers"
    :data="props.data"
    :name="props.name"
    :before-upload="beforeUpload"
    :on-progress="onProgress"
    :on-success="onSuccess"
    :accept="props.accept"
  >
    <div class="img-content" :style="style">
      <el-image v-if="!url" :src="placeholder" :style="style" fit="fill">
        <template #error>
          <i class="placeholder-icon el-icon-plus" />
        </template>
      </el-image>

      <template v-else>
        <el-image :src="url" fit="fill" :style="style" />
        <div class="mask">
          <i title="预览" class="icon el-icon-zoom-in" @click.stop="state.imageViewerVisible = true" />
          <i v-if="!noDel" title="移除" class="icon el-icon-delete" @click.stop="!$emit('update:url', '')" />
        </div>
      </template>
      <!-- TODO:此处应该使用v-show，但使用会不隐藏 -->
      <div v-if="state.percent" class="progress" :style="style">
        <el-image :src="state.preview" :style="style" fit="fill" />
        <el-progress type="circle" :width="Math.min(parseInt(width), parseInt(height)) * 0.8" :percentage="state.percent" />
      </div>
    </div>

    <template #tip>
      <p v-if="props.tip" class="tip">
        <i class="el-icon-info" />
        {{ tipText }}
      </p>
    </template>
  </el-upload>
  <el-image-viewer v-show="state.imageViewerVisible" :url-list="[url]" @close="state.imageViewerVisible = false" />
</template>
<script>
export default {
  name: 'ImgUpload',
}
</script>
<script setup>
import { reactive, defineProps, computed, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'
import _isBoolean from 'lodash/isBoolean'
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
  url: {
    type: String,
    default: '',
  },
  // 文件大小
  size: {
    type: Number,
    default: 2,
  },
  width: {
    type: [Number, String],
    default: 150,
  },
  height: {
    type: [Number, String],
    default: 150,
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
})

const message = computed(() => props.message || `请上传 ${props.ext.join(' 、')} 格式图片！`)

const tipText = computed(() => {
  const { tip, size, ext, width, height } = props
  if (_isBoolean(tip)) return `${message.value}且大小不超过 ${size}MB ，建尺寸为 ${width}*${height} 。`
  return tip
})

const state = reactive({
  imageViewerVisible: false,
  preview: '',
  percent: 0,
  progress: {},
})

const style = computed(() => ({
  width: parseInt(props.width) + 'px',
  height: parseInt(props.height) + 'px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

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
  if (isType && isSize) {
    state.preview = URL.createObjectURL(file)
  }
  return isType && isSize
}

const onSuccess = res => {
  state.percent = 100
  setTimeout(() => {
    state.preview = ''
    state.percent = 0
  }, 200)
  emit('on-success', res)
}

const onProgress = file => {
  //文件上传到服务器后会有一段处理时间，这时需要让进度条定格到96%，等服务器返回结果后再结束进度
  state.percent = ~~file.percent < 96 ? ~~file.percent : 96
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
.placeholder-icon {
  color: #909399;
  font-size: 30px;
}
.img-content {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  .mask {
    opacity: 0;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s;
    right: 0;
    bottom: 0;
    left: 0;
    top: 0;
    text-align: center;
    color: #fff;
    font-size: 24px;
    &::after {
      display: inline-block;
      content: '';
      height: 100%;
      vertical-align: middle;
    }
    .icon {
      cursor: pointer;
      transition: transform 0.3s;
      &:not(:last-child) {
        margin-right: 20px;
      }
      &:hover:not(.disabled) {
        transform: scale(1.3);
      }
    }
  }
  &:hover .mask {
    opacity: 1;
  }
}
.progress {
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .el-progress {
    position: absolute;
    z-index: 1;
    :deep(.el-progress__text) {
      color: #fff;
    }
  }
}
:deep(.el-upload) {
  //消除有图片后下边有一点距离的问题
  vertical-align: top;
}
</style>
