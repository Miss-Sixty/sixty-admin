<template>
  <el-space wrap>
    <div v-for="(item, index) in props.url" :key="index" :style="style" class="images">
      <el-image :src="item" fit="fill" :style="style" />
      <div class="images__mask">
        <p>
          <i title="预览" class="icon el-icon-zoom-in" @click="preview(index)" />
          <i v-if="delIcon" title="移除" class="icon el-icon-delete" @click="remove(index)" />
        </p>
        <p v-show="limit > 1">
          <i class="icon el-icon-back" title="左移" :class="{ disabled: index === 0 }" @click="index !== 0 && move(index, 'left')" />
          <i
            title="右移"
            :class="{ disabled: index === url.length - 1 }"
            class="icon el-icon-right"
            @click="index !== url.length - 1 && move(index, 'right')"
          />
        </p>
      </div>
    </div>

    <el-upload
      v-show="!limit || props.url.length < props.limit"
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
      <div class="uploader" :style="style">
        <div v-show="state.percent" class="progress" :style="{ 'background-image': `url(${state.preview})` }">
          <el-progress type="circle" :width="Math.min(parseInt(width), parseInt(height)) * 0.8" :percentage="state.percent">
            <template #default="{ percentage }">
              <span class="progress-value">{{ percentage }}%</span>
              <span class="progress-label">当前进度</span>
            </template>
          </el-progress>
        </div>
        <i class="icon el-icon-plus" />
      </div>
    </el-upload>
  </el-space>

  <p v-if="props.tip" class="tip">
    <i class="el-icon-info" />
    {{ tipText }}
  </p>
  <el-image-viewer v-show="state.imgViewerVisible" :url-list="[state.imgViewerUrl]" @close="state.imgViewerVisible = false" />
</template>
<script>
export default {
  name: 'ImgsUpload',
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
    type: Array,
    default: () => [],
  },
  // 文件大小
  size: {
    type: [Boolean, Number],
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
  //是否显示提示栏
  tip: [Boolean, String],
  //文件类型错误的提示文案
  message: String,
  ext: {
    type: Array,
    default: () => [],
  },
  delIcon: {
    type: Boolean,
    default: true,
  },
  limit: {
    type: [Boolean, Number],
    default: 3,
  },
})

//上传格式错误提示窗
const message = computed(() => props.message || `请上传 ${props.ext.join(' 、')} 格式图片！`)

//判断限制上传照片张数
const isLimit = computed(() => {
  const { limit } = props
  if (limit === true) return 3
  else if (limit) return limit
  return null
})

//提示栏提醒内容
const tipText = computed(() => {
  const { tip, size, ext, width, height, limit } = props
  const limitText = isLimit.value ? ` ，数量不超过 ${isLimit.value} 张。` : ' 。'
  if (_isBoolean(tip)) return `${message.value}且单张大小不超过 ${size}MB ，建尺寸为 ${width}*${height}${limitText}`
  return tip
})

const state = reactive({
  imgViewerVisible: false,
  imgViewerUrl: '',
  preview: '',
  percent: 0,
})

const style = computed(() => ({
  width: parseInt(props.width) + 'px',
  height: parseInt(props.height) + 'px',
}))

// 预览
const preview = index => {
  state.imgViewerUrl = props.url[index]
  state.imgViewerVisible = true
}
// 移除
const remove = index => {
  let url = [...props.url]
  url.splice(index, 1)
  emit('update:url', url)
}
// 移动
const move = (index, type) => {
  let url = [...props.url]
  if (type == 'left' && index !== 0) {
    url[index] = url.splice(index - 1, 1, url[index])[0]
  }
  if (type == 'right' && index !== url.length - 1) {
    url[index] = url.splice(index + 1, 1, url[index])[0]
  }
  emit('update:url', url)
}

const beforeUpload = file => {
  const { size, ext } = props
  let isSize = true
  let isType = true

  if (size) {
    isSize = file.size / 1024 / 1024 < props.size
    !isSize && ElMessage.error(`上传图片大小不能超过 ${props.size}MB！`)
  }

  if (ext.length) {
    const isType = props.ext.includes(file.type)
    !isType && ElMessage.error(message.value)
  }

  if (isSize && isType) state.preview = URL.createObjectURL(file)
  return isSize && isType
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
.images {
  position: relative;
  overflow: hidden;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  &:hover &__mask {
    opacity: 1;
  }
  &__mask {
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
    font-size: 28px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    > p {
      margin: 5px 0;
    }
    .icon {
      cursor: pointer;
      transition: transform 0.3s;
      &:not(:last-child) {
        margin-right: 25px;
      }
      &.disabled {
        color: #999;
        cursor: not-allowed;
      }
      &:hover:not(.disabled) {
        transform: scale(1.3);
      }
    }
  }
}
.uploader {
  overflow: hidden;
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  cursor: pointer;
  transition: color 0.3s, border-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: #8c939d;
  font-size: 28px;
  &:hover {
    border-color: #409eff;
    color: #409eff;
  }
  .progress {
    position: absolute;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
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
      z-index: 1;
    }
    &-value {
      display: block;
      margin-top: 10px;
      font-size: 28px;
      color: #fff;
    }
    &-label {
      display: block;
      margin-top: 10px;
      font-size: 12px;
      color: #fff;
    }
  }
}
.tip {
  margin: 5px 0 0;
  background-color: #f4f4f5;
  padding: 8px 16px;
  color: #909399;
  border-radius: 4px;
  display: inline-block;
}
.el-image {
  vertical-align: top;
}
</style>
