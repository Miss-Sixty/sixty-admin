<template>
  <el-form ref="formRef" v-loading="state.loading" :model="formData" label-position="top" hide-required-asterisk>
    <el-row :gutter="16">
      <el-col :span="24">
        <el-form-item label="派工常用人" prop="chosenPeople">
          <el-tag
            v-for="(tag, index) in formData.chosenPeople"
            :key="index"
            type="success"
            closable
            :disable-transitions="false"
            @close="tagCloseChange(index)"
          >
            {{ tag }}
          </el-tag>
          <el-button style="margin-left: 10px" size="small" icon="el-icon-plus"> 添 加 </el-button>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-button type="primary" @click="addChange">保存更改</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { validateForm, forInData } from '@/hooks'
import { backstage } from '@/api/user'
export default {
  setup() {
    const store = useStore()
    const state = reactive({
      loading: true,
    })
    const { formRef, validateFormChange } = validateForm()

    let formData = reactive({
      chosenPeople: [],
    })

    //删除常用人
    const tagCloseChange = index => formData.chosenPeople.splice(index, 1)

    // 新增/修改验证
    const addChange = async () => {
      try {
        await validateFormChange()
        await getUpdateConfig()
      } catch (err) {
        console.log(err)
      }
    }

    //获取配置
    const getConfig = () => {
      state.loading = true
      backstage()
        .then(res => {
          console.log(res)
          forInData(res.data, formData)
        })
        .finally(() => (state.loading = false))
    }

    //更新配置
    const getUpdateConfig = () => {
      state.loading = true
      store
        .dispatch('user/upDateUserInfo')
        .then(res => {
          ElMessage.success({
            message: res.message,
            type: 'success',
          })
        })
        .finally(() => (state.loading = false))
    }

    onMounted(() => {
      getConfig()
    })
    return {
      formData,
      state,
      formRef,
      addChange,
      tagCloseChange,
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

.el-tag + .el-tag {
  margin-left: 10px;
}
</style>
