<template>
  <el-form ref="formRef" :model="formData" class="form">
    <h1>重置密码</h1>
    <el-form-item prop="username" :rules="{ required: true, message: '请输入账号', trigger: 'blur' }">
      <el-input v-model="formData.username" prefix-icon="el-icon-user" placeholder="请输入账号" clearable :disabled="loading" />
    </el-form-item>
    <el-form-item prop="mobile" :rules="{ required: true, message: '请输入手机号', trigger: 'blur' }">
      <el-input v-model="formData.mobile" prefix-icon="el-icon-phone" placeholder="请输入手机号" clearable :disabled="loading" />
    </el-form-item>
    <el-form-item prop="code" :rules="{ required: true, message: '请输入密码', trigger: 'blur' }">
      <el-row>
        <el-input
          v-model="formData.code"
          prefix-icon="el-icon-chat-dot-square"
          placeholder="短信验证码"
          clearable
          :disabled="loading"
          style="flex: 1; margin-right: 16px"
        />
        <el-button @click="start"> {{ getButtonText }}</el-button>
      </el-row>
    </el-form-item>
    <el-form-item prop="password" :rules="{ required: true, message: '新密码不能为空', trigger: 'blur' }">
      <el-input v-model="formData.password" show-password prefix-icon="el-icon-lock" placeholder="请输入新密码" clearable />
    </el-form-item>

    <el-form-item prop="password" :rules="{ required: true, message: '请再次输入密码', trigger: 'blur' }">
      <el-input v-model="formData.password2" show-password prefix-icon="el-icon-lock" placeholder="请再次输入密码" clearable />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" :loading="loading" class="btn-long" @click="loginChange"> 重置密码 </el-button>
    </el-form-item>
    <el-form-item>
      <el-button :loading="loading" class="btn-long" @click="$emit('update:modelValue', 'base')"> 返 回 </el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { reactive, ref, defineEmits, computed } from 'vue'
import useFormValid from '@/hooks/useFormValid'
import { useCountdown } from '../MobileForm/useCountdown'
defineEmits(['update:modelValue'])
const loading = ref(false)
const formRef = ref()

const { validForm } = useFormValid(formRef)
const formData = reactive({
  username: '',
  mobile: '',
  code: '',
  password: '',
  password2: '',
})

// TODO:代替换倒计时 hooks 为 element-plus 自带倒计时（还未提供）
const { currentCount, isStart, start } = useCountdown(60)
const getButtonText = computed(() => {
  return !isStart.value ? '获取验证码' : `${currentCount.value}秒后重新获取`
})

//账号密码验证 登陆
async function loginChange() {
  try {
    await validForm()
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.btn-long {
  width: 100%;
}
</style>
