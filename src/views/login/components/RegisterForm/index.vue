<template>
  <el-form ref="formRef" :model="formData" class="form" v-loading="loading">
    <h1>注册</h1>
    <el-form-item prop="username" :rules="{ required: true, message: '请输入账号', trigger: 'blur' }">
      <el-input v-model="formData.username" prefix-icon="el-icon-user" placeholder="请输入账号" clearable />
    </el-form-item>
    <el-form-item prop="mobile" :rules="{ required: true, message: '请输入手机号', trigger: 'blur' }">
      <el-input v-model="formData.mobile" prefix-icon="el-icon-phone" placeholder="请输入手机号" clearable />
    </el-form-item>
    <el-form-item prop="code" :rules="{ required: true, message: '请输入密码', trigger: 'blur' }">
      <el-row>
        <el-input
          v-model="formData.code"
          prefix-icon="el-icon-chat-dot-square"
          placeholder="短信验证码"
          clearable
          style="flex: 1; margin-right: 16px"
        />
        <el-button @click="start"> {{ getButtonText }}</el-button>
      </el-row>
    </el-form-item>
    <el-form-item prop="password" :rules="{ required: true, message: '请输入密码', trigger: 'blur' }">
      <el-input v-model="formData.password" show-password prefix-icon="el-icon-lock" placeholder="请输入密码" clearable />
    </el-form-item>

    <el-form-item prop="password" :rules="{ required: true, message: '请再次输入密码', trigger: 'blur' }">
      <el-input v-model="formData.password2" show-password prefix-icon="el-icon-lock" placeholder="请再次输入密码" clearable />
    </el-form-item>

    <el-form-item>
      <el-checkbox v-model="agreement" label="我同意用户注册协议" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" class="btn-long" @click="loginChange"> 注 册 </el-button>
    </el-form-item>
    <el-form-item>
      <el-button class="btn-long" @click="$emit('update:modelValue', 'base')"> 返 回 </el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { reactive, ref, computed, defineEmits } from 'vue'
import { useCountdown } from '../MobileForm/useCountdown'
import { ElMessageBox, ElNotification } from 'element-plus'
import useFormValid from '@/hooks/useFormValid'

const emit = defineEmits(['update:modelValue'])
const loading = ref(false)
const agreement = ref(false)
const formRef = ref()

const { validForm } = useFormValid(formRef)
const formData = reactive({
  username: '',
  password: '',
  password2: '',
  mobile: '',
  code: '',
})

// TODO:代替换倒计时 hooks 为 element-plus 自带倒计时（还未提供）
const { currentCount, isStart, start } = useCountdown(60)
const getButtonText = computed(() => {
  return !isStart.value ? '获取验证码' : `${currentCount.value}秒后重新获取`
})

//注册
async function loginChange() {
  try {
    await validForm()
    await isAgreement()
    console.log(23)
    loading.value = true
    await new Promise(resolve =>
      setTimeout(() => {
        {
          ElNotification.success({
            title: '提示',
            message: '恭喜您，注册成功！',
          })
          resolve()
        }
      }, 1500)
    )
    emit('update:modelValue', 'base')
  } finally {
    loading.value = false
  }
}

//是否同意注册协议
const isAgreement = () => {
  if (!agreement.value) {
    return ElMessageBox.confirm('是否同意用户注册协议?', '提示', {
      confirmButtonText: '同意',
      cancelButtonText: '拒绝',
      type: 'warning',
    }).then(() => (agreement.value = true))
  }
}
</script>

<style lang="scss" scoped>
.btn-long {
  width: 100%;
}
</style>
