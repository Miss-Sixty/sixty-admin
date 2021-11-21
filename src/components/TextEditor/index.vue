<template>
  <!-- 编辑器 -->
  <Editor
    :editorId="editorId"
    :mode="mode"
    :defaultConfig="editorConfig"
    :defaultContent="getDefaultContent"
    @onChange="handleChange"
    @customAlert="customAlert"
    style="min-height: 900px"
  />
</template>

<script>
export default {
  name: 'TextEditor',
}
</script>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 也可以在 <style> 中 import
import { computed, onUnmounted } from 'vue'
import { Editor, getEditor, removeEditor } from '@wangeditor/editor-for-vue'
import { cloneDeep } from 'lodash-es'
import { useUserStore } from '@/store/modules/user'

const emit = defineEmits(['update:modelValue', 'on-progress'])
const props = defineProps({
  placeholder: {
    type: String,
    default: '请输入内容...',
  },
  editorId: String,
  // 工具栏配置
  toolbarConfig: {
    type: Object,
    default: () => ({
      excludeKeys: ['fullScreen', 'codeBlock', 'emotion'],
    }),
  },
  // 默认内容
  modelValue: Array,
  mode: {
    type: String,
    default: 'default',
  },
})

// 注意，深度拷贝 content ，否则会报错
const getDefaultContent = computed(() => cloneDeep(props.modelValue))

// 编辑器配置
const editorConfig = {
  placeholder: props.placeholder,
  autoFocus: false,
  scroll: false,
  MENU_CONF: {
    uploadImage: {
      fieldName: 'file',
      server: '/mock/upload',
      maxFileSize: 10 * 1024 * 1024, // 10M
      maxNumberOfFiles: 10, // 最多可上传几个文件
      headers: {
        Authorization: useUserStore().token,
      },
      base64LimitKB: 5, // 5kb
      // 上传之前触发
      onBeforeUpload() {
        emit('update:progress', true)
      },
      // 单个文件上传成功之后
      onSuccess() {
        emit('update:progress', false)
      },
      // 上传错误，或者触发 timeout 超时
      onError() {
        emit('update:progress', false)
      },
      // 自定义插入图片
      customInsert(res, insertFn) {
        insertFn(res.data.url)
      },
    },
  },
}

// 编辑器回调函数
const handleChange = editor => {
  emit('update:modelValue', editor.children)
  console.log(editor.getHtml())
}

const customAlert = (info, type) => {
  alert(`【自定义提示】${type} - ${info}`)
}

// 及时销毁编辑器
onUnmounted(() => {
  const editor = getEditor(props.editorId)
  if (editor == null) return

  // 销毁，并移除 editor
  editor.destroy()
  removeEditor(props.editorId)
})
</script>
