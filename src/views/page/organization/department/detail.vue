<template>
  <div>
    <page-header :title="state.pageTitle[state.type]" @click="backChange" />
    <page-main v-loading="state.loading" style="margin: 20px">
      <el-form
        ref="formRef"
        v-loading="state.infoLoading"
        :model="formData"
        :style="{ margin: '0 auto', width: ' 60%' }"
        label-width="80px"
      >
        <el-form-item
          label="姓名"
          prop="name"
          :rules="{
            required: true,
            message: '姓名不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="formData.name" clearable placeholder="请输入姓名" />
        </el-form-item>

        <el-form-item
          label="手机号"
          prop="phone"
          :rules="{
            required: true,
            message: '手机号不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="formData.phone" clearable t placeholder="请输入手机号" />
        </el-form-item>

        <el-form-item
          label="住址"
          prop="address"
          :rules="{
            required: true,
            message: '住址不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="formData.address" clearable placeholder="请输入住址" />
        </el-form-item>

        <el-form-item label="是否启用">
          <el-switch v-model="formData.status" />
        </el-form-item>
      </el-form>

      <fixed-action-bar style="text-align: center">
        <el-button type="primary" @click="onClickChange">确认提交</el-button>
        <el-button @click="backChange">取消</el-button>
      </fixed-action-bar>
    </page-main>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ElNotification, ElMessageBox } from 'element-plus'
import useFormValid from '@/hooks/useFormValid'
import { reactive, ref } from 'vue'
import useForInData from '@/hooks/useForInData'
import { add, edit, info } from '@/api/list'

const route = useRoute()
const router = useRouter()
const state = reactive({
  loading: false,
  pageTitle: {
    add: '新增员工',
    edit: '修改员工',
  },
  type: 'add',
  id: null,
})

const formRef = ref()
const { validForm } = useFormValid(formRef)

const formData = reactive({
  name: '',
  phone: '',
  address: '',
  status: false,
})

const backChange = () => router.push({ name: 'Table' })

function init() {
  const { params, name } = route
  if (name === 'TableAdd') return (state.type = 'add')
  state.type = 'edit'
  state.id = params.id
  getInfo()
}

//获取详情
function getInfo() {
  state.loading = true
  info({ id: state.id })
    .then(res => useForInData(res.data, formData))
    .finally(() => (state.loading = false))
}

// 新增/修改验证
const onClickChange = () => {
  validForm()
    .then(() => (state.type === 'add' ? addHandleChange() : editHandleChange()))
    .catch(() => {})
}

//新增
function addHandleChange() {
  state.loading = true
  add(formData)
    .then(res => {
      ElNotification({
        title: '提示',
        message: res.message,
        type: 'success',
      })
      state.dialogVisible = false
      setTimeout(() => {
        ElMessageBox.confirm('是否要退出新增页？', '提示', { type: 'warning' })
          .then(() => backChange())
          .catch(() => {})
      }, 800)
    })
    .finally(() => {
      state.loading = false
    })
}

// 修改
function editHandleChange() {
  state.loading = true
  edit({ ...formData, id: state.id })
    .then(res => {
      ElNotification({
        title: '提示',
        message: res.message,
        type: 'success',
      })
      state.dialogVisible = false

      setTimeout(() => {
        ElMessageBox.confirm('是否要退出修改页？', '提示', { type: 'warning' })
          .then(() => backChange())
          .catch(() => {})
      }, 800)
    })
    .finally(() => {
      state.loading = false
    })
}

init()
</script>
