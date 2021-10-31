<template>
  <div v-loading="state.loading">
    <router-link custom :to="{ name: 'NoticeType' }" v-slot="{ navigate }">
      <page-header :title="state.pageTitle[state.type]" @click="navigate" />
    </router-link>

    <page-main style="margin: 20px">
      <el-form ref="formRef" :model="formData" style="margin: 0 auto; width: 60%" label-width="80px">
        <el-form-item
          label="类型名称"
          prop="title"
          :rules="{
            required: true,
            message: '类型名称不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="formData.title" clearable placeholder="请输入类型名称" />
        </el-form-item>
      </el-form>

      <FixedActionBar style="text-align: center">
        <router-link custom :to="{ name: 'NoticeType' }" v-slot="{ navigate }">
          <el-button @click="navigate">取消</el-button>
        </router-link>
        <el-button type="primary" @click="onClickChange">确认提交</el-button>
      </FixedActionBar>
    </page-main>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { reactive, ref } from 'vue'
import { add, edit } from '@/api/notice/type'
import useForInData from '@/hooks/useForInData'
import useAddOrEditSubmit from '@/hooks/customized/useAddOrEditSubmit'

const route = useRoute()
const state = reactive({
  loading: false,
  pageTitle: {
    add: '新增类型',
    edit: '编辑类型',
  },
  type: 'add',
  id: null,
})

const formRef = ref()
const submitHandleChange = useAddOrEditSubmit(formRef, 'NoticeType')
const formData = reactive({
  title: '',
})

// 新增/修改验证
const onClickChange = async () => {
  console.log(edit)
  try {
    state.type === 'add'
      ? submitHandleChange(add, formData, state)
      : submitHandleChange(edit, { ...formData, id: state.id }, state, '修改')
  } catch (err) {
    console.log(err)
  }
}

const init = () => {
  const { params, query, name } = route
  console.log(params, query, name)
  if (name === 'NoticeTypeAdd') return (state.type = 'add')
  state.type = 'edit'
  state.id = params.id
  useForInData(query, formData)
}
init()
</script>
