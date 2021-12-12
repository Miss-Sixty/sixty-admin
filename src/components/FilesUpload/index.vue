<template>
  <div>
    {{ files }}
    {{ listField }}
  </div>
  <!-- <el-upload v-bind="$attrs" :file-list="fileDataFormat" :before-upload="beforeUpload">
    <slot>
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </slot>
    <template #tip>
      <div v-if="tip" class="tip">{{ tip }}</div>
    </template>
  </el-upload> -->
</template>

<script>
export default {
  name: 'FilesUpload'
}
</script>
<script setup>

defineProps({
  files: {
    type: [Array, Object],
    default: () => {},
    required: true
  },
  listField: {
    type: Object,
    default: () => {},
    validator(value) {
      for (let key in value) {
        console.log(key)
        console.log(['name', 'url', 'id'].includes(key))
        if (!['name', 'url', 'id'].includes(key)) return false
      }
    }
  }
 
})

</script>
