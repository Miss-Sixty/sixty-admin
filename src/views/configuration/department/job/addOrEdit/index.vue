<template>
  <div v-loading="state.loading">
    <page-header :content="state.pageTitle[state.type]" @back="backChange" />

    <div class="page-main">
      <el-form ref="formRef" v-loading="state.infoLoading" :model="formData" style="width: 500px; margin: 0 auto">
        <el-form-item
          label="部门职位"
          prop="name"
          :rules="{
            required: true,
            message: '职位名称不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="formData.name" clearable placeholder="请输入职位名称" />
        </el-form-item>
      </el-form>

      <FixedActionBar>
        <el-button type="primary" @click="onClickChange">确认提交</el-button>
        <el-button @click="backChange">取消</el-button>
      </FixedActionBar>
    </div>
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import { validateForm, forInData, toRouter } from '@/hooks'
import { reactive, onMounted } from 'vue'
import { departmentAdd, departmentEdit } from '@/api/department'

export default {
  emits: ['onSuccess'],
  setup(props, { emit }) {
    const route = useRoute()
    const state = reactive({
      loading: false,
      pageTitle: {
        add: '新增职位',
        edit: '修改职位',
      },
      type: 'add',
      id: null,
    })
    const { formRef, validateFormChange } = validateForm()
    const formData = reactive({
      name: '',
    })

    const backChange = () => {
      toRouter({ name: 'Job' })
    }

    // TODO:使用/:id的方式传递参数页面刷新后会报错，怀疑是vue-router自己的错误
    const init = () => {
      const query = route.query
      if (query.type !== 'edit') return (state.type = 'add')
      state.type = 'edit'
      state.id = query.id
      forInData(query, formData)
    }

    // 新增/修改验证
    const onClickChange = () => {
      validateFormChange()
        .then(() => {
          state.type === 'add' ? addHandleChange() : editHandleChange()
        })
        .catch(() => {})
    }

    //新增
    const addHandleChange = () => {
      console.log('新增')
      state.loading = true
      departmentAdd(formData)
        .then(res => {
          ElNotification({
            title: '提示',
            message: res.message,
            type: 'success',
          })
          state.dialogVisible = false
          emit('onSuccess') //TODO:该方法暂无使用场景
        })
        .finally(() => {
          state.loading = false
        })
    }

    //修改
    const editHandleChange = () => {
      console.log('修改')
      state.loading = true
      departmentEdit({ ...formData, id: state.id })
        .then(res => {
          ElNotification({
            title: '提示',
            message: res.message,
            type: 'success',
          })
          state.dialogVisible = false
          emit('onSuccess')
        })
        .finally(() => {
          state.loading = false
        })
    }

    onMounted(() => {
      init()
    })

    return {
      backChange,
      onClickChange,
      formRef,
      formData,
      state,
    }
  },
}
</script>
<style lang="scss" scoped>
.box {
  height: 180px;
  background-color: aquamarine;
}
</style>
