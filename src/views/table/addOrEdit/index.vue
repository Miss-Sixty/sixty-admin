<template>
  <div v-loading="state.loading">
    <page-header :title="state.pageTitle[state.type]" @back="backChange" />
    <six-card padding="50px 0 10px">
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

      <FixedActionBar>
        <el-button type="primary" @click="onClickChange">确认提交</el-button>
        <el-button @click="backChange">取消</el-button>
      </FixedActionBar>
    </six-card>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import { validateForm, forInData, toRouter, messageBoxChange } from '@/hooks'
import { reactive } from 'vue'
import { add, edit, info } from '@/api/list'

const route = useRoute()
const state = reactive({
  loading: false,
  pageTitle: {
    add: '新增员工',
    edit: '修改员工',
  },
  type: 'add',
  id: null,
})
const { formRef, validateFormChange } = validateForm()

const formData = reactive({
  name: '',
  phone: '',
  address: '',
  status: false,
})

const backChange = () => toRouter('Table')

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
    .then(res => {
      console.log(res.data)
      forInData(res.data, formData)
    })
    .finally(() => (state.loading = false))
}

// 新增/修改验证
function onClickChange() {
  validateFormChange()
    .then(() => {
      state.type === 'add' ? addHandleChange() : editHandleChange()
    })
    .catch(() => {})
}

//新增
function addHandleChange() {
  console.log('新增')
  state.loading = true
  add(formData)
    .then(res => {
      ElNotification({
        title: '提示',
        message: res.msg,
        type: 'success',
      })
      state.dialogVisible = false
      setTimeout(() => {
        messageBoxChange('是否要退出新增页？').then(() => backChange())
      }, 500)
    })
    .finally(() => {
      state.loading = false
    })
}

//修改
function editHandleChange() {
  console.log('修改')
  state.loading = true
  edit({ ...formData, id: state.id })
    .then(res => {
      ElNotification({
        title: '提示',
        message: res.msg,
        type: 'success',
      })
      state.dialogVisible = false
      setTimeout(() => {
        messageBoxChange('是否要退出修改页？').then(() => backChange())
      }, 500)
    })
    .finally(() => {
      state.loading = false
    })
}

init()
</script>
