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
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import { messageBoxChange } from '@/hooks'

export default {
  name: 'ConfirmSwitch',
  props: {
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
  },
  emits: ['on-success'],
  setup(props, { emit }) {
    let loading = ref(false)

    const beforeChange = () => {
      return new Promise(() => {
        messageBoxChange(props.text)
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
          .catch(res => {
            ElNotification.error({
              title: '提示',
              message: res.message,
            })
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
