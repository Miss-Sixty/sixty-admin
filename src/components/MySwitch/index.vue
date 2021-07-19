<template>
  <el-switch
    :model-value="status"
    :loading="loading"
    :before-change="beforeChange"
    :active-value="1"
    :inactive-value="0"
    :active-text="activeText"
    :inactive-text="inactiveText"
    :disabled="disabled"
  />
</template>
<script>
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import { messageBoxChange } from '@/hooks'

export default {
  props: {
    api: Function,
    activeText: String,
    inactiveText: String,
    status: [String, Number],
    id: Number,
    disabled: Boolean,
  },
  emits: ['on-success'],
  setup(props, { emit }) {
    let loading = ref(false)

    const beforeChange = () => {
      return new Promise(() => {
        messageBoxChange(`确定要「${props.status ? props.inactiveText : props.activeText}」该数据吗？`)
          .then(() => upDataSwitch())
          .catch(() => {})
      })
    }

    const upDataSwitch = () => {
      return new Promise(resolve => {
        loading.value = true
        props
          .api({ id: props.id, status: props.status ? 0 : 1 })
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

    return {
      loading,
      beforeChange,
    }
  },
}
</script>
