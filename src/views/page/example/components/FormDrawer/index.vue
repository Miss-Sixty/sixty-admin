<template>
  <el-drawer
    :title="props.title"
    width="600px"
    :close-on-click-modal="false"
    :show-close="false"
    :close-on-press-escape="false"
    @closed="resetFields"
  >
    <DetailForm ref="formRef" v-bind="$props" />
    <div style="text-align: center;margin: 20px;">
      <el-button @click="$emit('update:modelValue',false)"> 取 消 </el-button>
      <el-button type="primary" @click="onSubmitChange">
        确 定
      </el-button>
    </div>
  </el-drawer>
</template>

<script setup>
import DetailForm from '../DetailForm/index.vue'
import useFormMethod from '@/hooks/useFormMethod'
import { ref } from 'vue'

defineEmits(['update:modelValue'])
defineProps({
  props: {
    type: Object,
    default: () => {}
  }
})

const formRef = ref()
const { validate, resetFields } = useFormMethod(formRef, ['validate', 'resetFields'])

const onSubmitChange = () => {
  console.log(validate())
}

</script>

