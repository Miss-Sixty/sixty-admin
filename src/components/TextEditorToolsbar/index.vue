<template>
  <div class="toolsbar">
    <Toolbar :editorId="editorId" :defaultConfig="toolbarConfig" :mode="mode" style="max-width: 1200px; margin: auto" />
  </div>
</template>

<script>
export default {
  name: 'TextEditorToolsbar',
}
</script>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 也可以在 <style> 中 import
import { onUnmounted } from 'vue'
import { Toolbar, getEditor, removeEditor } from '@wangeditor/editor-for-vue'

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
  mode: {
    type: String,
    default: 'default',
  },
})

// 及时销毁编辑器
onUnmounted(() => {
  const editor = getEditor(props.editorId)
  if (editor == null) return

  // 销毁，并移除 editor
  editor.destroy()
  removeEditor(props.editorId)
})
</script>

<style lang="scss" scoped>
.toolsbar {
  box-shadow: 0 0 1px #ccc;
  background-color: #fff;
}
</style>
