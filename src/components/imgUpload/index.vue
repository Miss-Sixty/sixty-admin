<template>
  <el-space wrap style="vertical-align: top;">
    <div v-for="(item, index) in fileDataFormat" :key="index" class="imgs" :style="{ width, height }">
      <el-image :src="item.url" :alt="item.name" style="width: 100%; height: 100%;">
        <template #placeholder>
          <div class="image-icon">
            <el-icon class="is-loading" size="30">
              <Loading />
            </el-icon>
          </div>
        </template>

        <template #error>
          <div class="image-icon">
            <el-icon size="30"><Picture /> </el-icon>
          </div>
        </template>
      </el-image>

      <div class="imgs__mask">
        <p>
          <ZoomIn title="预览" role="button" class="icon" :style="{ width: iconSize }" @click="preview(index)" />
          <Delete title="移除" role="button" class="icon" :style="{ width: iconSize }" @click="remove(index)" />
        </p>
        <p v-if="fileDataFormat.length > 1">
          <Back
            title="左移"
            role="button"
            class="icon"
            :class="{ disabled: index === 0 }"
            :style="{ width: iconSize }"
            @click="index !== 0 && move(index, 'left')"
          />
          <Right
            title="右移"
            role="button"
            class="icon"
            :class="{ disabled: index === fileDataFormat.length - 1 }"
            :style="{ width: iconSize }"
            @click="index !== fileDataFormat.length - 1 && move(index, 'right')"
          />
        </p>
      </div>
    </div>

    <el-upload
      v-show="!limit || fileDataFormat.length < limit"
      :action="action"
      :disabled="state.percent !== 0"
      :on-success="onSuccessChange"
      :show-file-list="false"
      :on-progress="onProgressChange"
      :before-upload="beforeUpload"
      :accept="acceptType"
    >
      <div
        class="uploader"
        :style="{ width, height, backgroundImage: `url(${state.preview})`, borderStyle: state.preview ? 'solid' : 'dashed' }"
        role="button"
      >
        <Plus v-if="state.percent === 0" class="uploader-icon" />
        <el-progress v-else type="circle" :width="Math.min(parseInt(width), parseInt(height)) * 0.8" :percentage="state.percent" />
      </div>
    </el-upload>
  </el-space>
  <slot name="tip">
    <div v-if="tip" class="tip">{{ tip }}</div>
  </slot>
  <el-image-viewer
    v-if="imageViewer.imgViewerVisible"
    :url-list="imageViewerList"
    :initial-index="imageViewer.initialIndex"
    @close="imageViewer.imgViewerVisible = false"
  />
</template>
<script>
export default {
  name: 'ImgUpload'
}
</script>
<script setup>
import { Loading, Picture, ZoomIn, Delete, Back, Right, Plus } from '@element-plus/icons'
import { reactive, computed, watchEffect } from 'vue'
import { isArray, isObject } from 'lodash-es'
import uploadType from '@/utils/uploadType'
import { ElMessage } from 'element-plus'

const props = defineProps({
  width: {
    type: String,
    default: '100px'
  },
  height: {
    type: String,
    default: '100px'
  },
  modelValue: {
    type: [Array, Object],
    default: [],
    required: true
  },
  fileName: {
    type: String,
    default: 'name'
  },
  fileUrl: {
    type: String,
    default: 'url'
  },
  iconSize: {
    type: String,
    default: '26px'
  },
  limit: Number,
  tip: String,
  // 文件大小 MB
  size: {
    type: Number,
    default: 8
  },
  accept: Array,
  action: String
})

const emit = defineEmits(['on-change', 'update:modelValue', 'on-success'])

const fileDataFormat = computed(() => {
  if (isArray(props.modelValue))
    return props.modelValue.map(item => ({ ...item, name: item[props.fileName], url: item[props.fileUrl] }))
  if (isObject(props.modelValue))
    return [{ ...props.modelValue, name: props.modelValue[props.fileName], url: props.modelValue[props.fileUrl] }]
})

watchEffect(() => emit('on-change', fileDataFormat.value))

// 预览图片
const imageViewerList = computed(() => fileDataFormat.value.map(item => item.url))
const imageViewer = reactive({
  imgViewerVisible: false,
  initialIndex: 0
})

const acceptType = computed(() => {
  // 如果传来为空数组，则不限制类型，否则限制传入类型
  if (props.accept) return (props.accept && props.accept.toString()) || ''

  // 默认限制类型
  let arr = []
  for (const key in uploadType) {
    arr = arr.concat(uploadType[key])
  }
  return arr.toString()
})

const state = reactive({
  percent: 0,
  preview: ''
})

const beforeUpload = file => {
  const isType = acceptType.value.includes(file.type)
  const isSize = file.size / 1024 / 1024 < props.size
  if (!isType) ElMessage.error('不可上传此格式文件！')
  if (!isSize) ElMessage.error(`图片大小不可超过${props.size}MB`)
  if (isType && isSize) state.preview = URL.createObjectURL(file)
  return isType && isSize
}

const onSuccessChange = (res, file) => {
  state.percent = 100
  const { data } = res
  const fileList = [...fileDataFormat.value, { ...data, name: data[props.fileName], url: data[props.fileUrl] }]
  setTimeout(() => {
    state.preview = ''
    state.percent = 0
    emit('on-success', res, file, fileList)
    emit('update:modelValue', fileList)
  }, 200)
}

const onProgressChange = file => {
  state.percent = ~~file.percent < 99 ? ~~file.percent : 99
}

// 预览
const preview = index => {
  console.log(index)
  imageViewer.initialIndex = index
  imageViewer.imgViewerVisible = true
}

// 移除
const remove = index => {
  const fileList = fileDataFormat.value
  fileList.splice(index, 1)
  emit('update:modelValue', fileList)
}

// 移动
const move = (index, type) => {
  const fileList = fileDataFormat.value
  if (type == 'left' && index !== 0) {
    fileList[index] = fileList.splice(index - 1, 1, fileList[index])[0]
  }
  if (type == 'right' && index !== fileList.length - 1) {
    fileList[index] = fileList.splice(index + 1, 1, fileList[index])[0]
  }
  emit('update:modelValue', fileList)
}
</script>

<style lang="scss" scoped>
.image-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f7fa;
  color: var(--el-text-color-placeholder);
  height: 100%;
}
.imgs {
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  border: 1px solid #f0f2f5;
  &:hover &__mask {
    opacity: 1;
  }
  &__mask {
    opacity: 0;
    position: absolute;
    background-color: rgb(0 0 0 / 50%);
    transition: opacity 0.3s;
    right: 0;
    bottom: 0;
    left: 0;
    top: 0;
    color: #fff;
    font-size: 28px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 12%;
    > p {
      margin: 0;
      display: flex;
      justify-content: space-around;
    }
    .icon {
      transition: transform 0.3s;
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
  width: 100%;
  height: 100%;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  transition: border-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fbfdff;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  &:hover {
    border-color: #409eff;
    .uploader-icon {
      color: #409eff;
    }
  }
  &-icon {
    width: 26px;
    transition: color 0.3s;
    color: #8c939d;
  }
  ::v-deep(.el-progress) {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(0 0 0 / 50%);
    .el-progress__text {
      color: #fff;
    }
  }
}
.tip {
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 7px;
}
::v-deep(.el-upload) {
  vertical-align: middle;
}
</style>
