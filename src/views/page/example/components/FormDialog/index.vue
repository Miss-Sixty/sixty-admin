<template>
  <el-dialog
    :title="props.title"
    width="600px"
    :close-on-click-modal="false"
    :show-close="false"
    @closed="resetFields"
  >
    <DetailForm ref="formRef" v-bind="$props" />
    <template #footer>
      <el-button @click="$emit('update:modelValue',false)"> 取 消 </el-button>
      <el-button type="primary" @click="onSubmitChange">
        确 定
      </el-button>
    </template>
  </el-dialog>
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

