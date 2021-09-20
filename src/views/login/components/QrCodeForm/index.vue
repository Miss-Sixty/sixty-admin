<template>
  <el-form class="form">
    <h1>二维码登录</h1>
    TODO
    <el-form-item> </el-form-item>
    <el-divider>扫码后点击"确认"，即可完成登录</el-divider>
    <el-form-item>
      <el-button :loading="loading" class="btn-long" @click="$emit('update:modelValue', 'base')"> 返 回 </el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, defineEmits } from 'vue'

defineEmits(['update:modelValue'])

const loading = ref(false)
</script>

<style lang="scss" scoped>
.btn-long {
  width: 100%;
}
:deep(.el-divider__text) {
  font-size: 12px;
  color: #00000073;
  white-space: nowrap;
}
</style>
