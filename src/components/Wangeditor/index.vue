<template>
  <div ref="editor" />
</template>
<script>
export default {
  name: 'WangEditor',
}
</script>
<script setup>
import { onMounted, onBeforeUnmount, ref, watch, defineProps, defineEmits } from 'vue'
import E from 'wangeditor'
import { ElMessage } from 'element-plus'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  height: {
    type: Number,
    default: 350,
  },
  placeholder: {
    type: String,
    default: '请输入文本内容',
  },
  modelValue: String, //默认内容
})
const editor = ref()
let instance
const init = () => {
  instance = new E(editor.value)
  instance.config.height = props.height
  instance.config.placeholder = props.placeholder
  instance.config.customAlert = (s, t) => {
    const obj = {
      success: ElMessage.success(s),
      info: ElMessage.info(s),
      warning: ElMessage.warning(s),
      error: ElMessage.error(s),
    }
    obj[t] || obj.info
  }

  // 将内容同步到父组件中
  instance.config.onchange = html => emit('update:modelValue', html)

  instance.create()
  instance.txt.html(props.modelValue)
}

onMounted(() => init())
onBeforeUnmount(() => {
  instance.destroy()
  instance = null
})

watch(
  () => props.modelValue,
  val => {
    if (val !== instance.txt.html()) {
      instance.txt.html(props.modelValue)
    }
  }
)
</script>
