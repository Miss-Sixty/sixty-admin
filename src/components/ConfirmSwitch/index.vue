<template>
  <el-switch
    :model-value="modelValue"
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
import { messageBoxChange } from '@/hooks'

export default {
  name: 'ConfirmSwitch',
  props: {
    modelValue: [Boolean, Number, String],
    activeText: String,
    inactiveText: String,
    activeValue: {
      type: [Boolean, Number, String],
      default: true,
    },
    inactiveValue: {
      type: [Boolean, Number, String],
      default: false,
    },
    disabled: Boolean,
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
          .then(() => {
            loading.value = true
            emit('on-success', closeLoading)
          })
          .catch(() => {})
      })
    }

    const closeLoading = () => (loading.value = false)
    return {
      loading,
      beforeChange,
    }
  },
}
</script>
