<template>
  <el-switch
    :model-value="status"
    :loading="loading"
    :before-change="beforeChange"
    :active-value="activeValue"
    :inactive-value="inactiveValue"
    :active-text="activeText"
    :inactive-text="inactiveText"
    :disabled="disabled"
  />
</template>

<script>
export default {
  name: 'ConfirmSwitch',
}
</script>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { ElNotification, ElMessageBox } from 'element-plus'
const props = defineProps({
  api: Function,
  activeText: String,
  inactiveText: String,
  activeValue: {
    type: Boolean,
    default: true,
  },
  inactiveValue: {
    type: Boolean,
    default: false,
  },
  status: [Boolean, String, Number],
  id: Number,
  disabled: Boolean,
  data: Object,
  text: {
    type: String,
    default: '确定要更改该数据吗？',
  },
})
const emit = defineEmits(['on-success'])

let loading = ref(false)

const beforeChange = () => {
  return new Promise(() => {
    ElMessageBox.confirm(props.text, '提示', { type: 'warning' })
      .then(() => upDataSwitch())
      .catch(() => {})
  })
}

const upDataSwitch = () => {
  return new Promise(resolve => {
    loading.value = true
    const data = props.data || { id: props.id, status: props.status ? props.inactiveValue : props.activeValue }
    props
      .api(data)
      .then(res => {
        emit('on-success')
        ElNotification({
          title: '提示',
          message: res.message,
          type: 'success',
        })
        resolve(true)
      })
      .finally(() => {
        loading.value = false
      })
  })
}
</script>
