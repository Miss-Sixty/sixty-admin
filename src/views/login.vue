<template>
  <el-row type="flex" class="login" justify="center">
    <el-form ref="formRef" :model="loginForm" class="form">
      <el-form-item>
        <h2 style="margin: 0">{{ title }}</h2>
      </el-form-item>

      <el-form-item prop="username" :rules="{ required: true, message: '请输入用户名', trigger: 'blur' }">
        <el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="请输入用户名" clearable :disabled="loading" />
      </el-form-item>

      <el-form-item prop="password" :rules="{ required: true, message: '请输入密码', trigger: 'blur' }">
        <el-input
          v-model="loginForm.password"
          show-password
          prefix-icon="el-icon-lock"
          placeholder="请输入密码"
          clearable
          :disabled="loading"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :loading="loading" style="width: 100%" @click="loginChange"> 登 陆 </el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>
<script setup>
import { reactive, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { validateForm } from '@/hooks'

const router = useRouter()
const route = useRoute()
const store = useStore()
const loading = ref(false)
const { formRef, validateFormChange } = validateForm()
const loginForm = reactive({
  username: 'admin',
  password: '123456',
})
const title = computed(() => store.state.setting.title)

//账号密码验证 登陆
async function loginChange() {
  try {
    await validateFormChange()
    loading.value = true
    await store.dispatch('user/login', loginForm)
    await store.dispatch('user/getUserInfo')
    loading.value = false
    router.replace({ path: route.query?.redirect || '/' })
  } catch (err) {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  background-color: cadetblue;
  overflow: hidden;
  .form {
    width: 350px;
    margin-top: 170px;
    text-align: center;
  }
}
</style>
