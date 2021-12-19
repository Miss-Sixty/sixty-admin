<template>
  <el-form ref="formRef" :model="formData">
    <el-form-item
      label="姓名"
      prop="name"
      :rules="{ required: true, message: '姓名不能为空', trigger: 'blur', }"
    >
      <el-input v-model="formData.name" clearable placeholder="请输入姓名" />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import useFormMethod from '@/hooks/useFormMethod'

const formData = reactive({
  name: ''
})

const formRef = ref()
const formMethod = useFormMethod(formRef, ['validate', 'resetFields'])

defineExpose({ ...formMethod })

</script>
