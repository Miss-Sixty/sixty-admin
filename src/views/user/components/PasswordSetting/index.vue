<template>
  <el-form ref="formRef" v-loading="state.infoLoading" :model="formData" label-position="top" hide-required-asterisk>
    <el-row :gutter="16">
      <el-col :span="24">
        <el-form-item
          label="旧密码"
          prop="oldPassowrd"
          :rules="{
            required: true,
            message: '旧密码不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="formData.oldPassowrd" clearable show-password placeholder="请输入旧密码" />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item
          label="新密码"
          prop="newPassword"
          :rules="{
            required: true,
            message: '新密码不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="formData.newPassword" clearable show-password placeholder="请输入新密码" />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item
          label="再次输入新密码"
          prop="newPasswordTwo"
          :rules="{
            required: true,
            message: '新密码不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="formData.newPasswordTwo" clearable show-password placeholder="请再次输入新密码" />
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-button type="primary" @click="addChange">保存更改</el-button>
        <el-button @click="resetDataChange">重 置</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { validateForm, forInData } from '@/hooks'
import { ElMessage } from 'element-plus'

export default {
  setup() {
    const store = useStore()
    const state = reactive({
      infoLoading: false,
    })

    const { formRef, validateFormChange, resetFieldsForm } = validateForm()

    const formData = reactive({
      oldPassword: '',
      newPassword: '',
      oldPasswordTwo: '',
    })

    // 新增/修改验证
    const addChange = () => {
      validateFormChange()
        .then(() => {
          getEditPassword()
        })
        .catch(() => {})
    }

    const getEditPassword = () => {
      state.infoLoading = true
      store
        .dispatch('user/getUserInfo')
        .then(res => {
          for (let key in formData) {
            formData[key] = res[key]
          }
        })
        .finally(() => (state.infoLoading = false))
    }

    //重置
    const resetDataChange = () => {
      forInData({}, formData)
      resetFieldsForm()
      ElMessage.success({
        message: '数据重置成功！',
        type: 'success',
      })
    }

    return {
      formData,
      state,
      resetDataChange,
      formRef,
      addChange,
    }
  },
}
</script>
<style lang="scss" scoped>
.avatar {
  &-right {
    margin-left: 20px;
    p {
      margin: 0;
      font-size: 13px;
      color: #888;
    }
  }
}
:deep(.el-form-item__label) {
  padding: 0;
  line-height: 30px;
}
</style>
