<template>
  <div v-loading="state.loading">
    <router-link custom :to="{ name: 'Notice' }" v-slot="{ navigate }">
      <page-header :title="state.pageTitle[state.type]" @click="navigate" />
    </router-link>

    <page-main style="margin: 20px">
      <el-form ref="formRef" v-loading="state.infoLoading" :model="formData" style="margin: 0 auto; width: 60%" label-width="80px">
        <el-form-item
          label="公告标题"
          prop="title"
          :rules="{
            required: true,
            message: '公告标题不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="formData.title" clearable placeholder="请输公告标题" />
        </el-form-item>

        <el-form-item
          label="公告类型"
          prop="type_id"
          :rules="{
            required: true,
            message: '公告类型不能为空',
            trigger: 'change',
          }"
        >
          <el-select
            v-model="formData.type_id"
            :loading="noticeType.loading"
            placeholder="请选择公告类型"
            @visible-change="visibleChange"
          >
            <el-option v-for="item in noticeType.list" :key="item.id" :label="item.title" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item
          label="公告内容"
          prop="text"
          :rules="{
            required: true,
            message: '公告内容不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="formData.text" clearable type="textarea" :rows="3" placeholder="请输入公告内容" />
        </el-form-item>
      </el-form>

      <FixedActionBar style="text-align: center">
        <router-link custom :to="{ name: 'Notice' }" v-slot="{ navigate }">
          <el-button @click="navigate">取消</el-button>
        </router-link>
        <el-button type="primary" @click="onClickChange">确认提交</el-button>
      </FixedActionBar>
    </page-main>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import useForInData from '@/hooks/useForInData'
import useAddOrEditSubmit from '@/hooks/customized/useAddOrEditSubmit'
import { reactive, ref } from 'vue'
import { add, edit, info } from '@/api/notice/index'
import { list } from '@/api/notice/type'

const route = useRoute()
const state = reactive({
  loading: false,
  pageTitle: {
    add: '新增通知公告',
    edit: '修改通知公告',
  },
  type: 'add',
  id: null,
})

const formRef = ref()
const submitHandleChange = useAddOrEditSubmit(formRef, 'Notice')

const formData = reactive({
  title: '',
  type_id: null,
  text: '',
})

//获取详情
const getInfo = () => {
  state.loading = true
  info({ id: state.id })
    .then(res => {
      console.log(res)
      useForInData(res.data, formData)
    })
    .finally(() => (state.loading = false))
}

//类型列表
const noticeType = reactive({
  loading: false,
  list: [],
})
const visibleChange = async bl => {
  if (!bl || noticeType.list.length) return
  noticeType.loading = true
  try {
    const res = await list()
    console.log(res)
    noticeType.list = res.data.list
  } finally {
    noticeType.loading = false
  }
}

// 新增/修改验证
const onClickChange = async () => {
  try {
    state.type === 'add'
      ? submitHandleChange(add, formData, state)
      : submitHandleChange(edit, { ...formData, id: state.id }, state, '修改')
  } catch (err) {
    console.log(err)
  }
}

const init = () => {
  const { params, name } = route
  visibleChange(true)
  if (name === 'NoticeAdd') return (state.type = 'add')
  state.type = 'edit'
  state.id = params.id
  getInfo()
}
init()
</script>
