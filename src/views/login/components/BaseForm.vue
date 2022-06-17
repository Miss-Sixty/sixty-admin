<template>
  <el-form ref="formRef" :model="formData" @keyup.enter="loginChange">
    <el-form-item prop="username" :rules="{ required: true, message: '请输入账号', trigger: 'blur' }">
      <el-input v-model="formData.username" :prefix-icon="User" placeholder="请输入账号" clearable :disabled="state.loading" />
    </el-form-item>
    <el-form-item prop="password" :rules="{ required: true, message: '请输入密码', trigger: 'blur' }">
      <el-input v-model="formData.password" show-password :prefix-icon="Lock" placeholder="请输入密码" clearable :disabled="state.loading" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="state.loading" class="btn-long" @click="loginChange"> 登 录 </el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import 'element-plus/es/components/message/style/css'
import { User, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
defineEmits(['update:modelValue'])
const userStore = useUserStore()

const router = useRouter()
const route = useRoute()

const state = reactive({
  loading: false,
})
const formData = reactive({
  username: 'admin',
  password: '123456',
})

// 账号密码验证 登陆
const formRef = ref()
async function loginChange() {
  state.loading = true
  try {
    await formRef.value.validate()
    // 获取token和用户信息
    await userStore.getToken(formData)
    await router.replace({ path: route.query?.redirect || '/' })
    ElMessage.success({
      title: '提示',
      message: '登陆成功！',
    })
  } catch {
  } finally {
    state.loading = false
  }
}
</script>

<style lang="scss" scoped>
.btn-long {
  width: 100%;
}
</style>
