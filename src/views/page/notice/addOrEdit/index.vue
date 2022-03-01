<template>
  <div>
    <router-link custom :to="{ name: 'Notice' }" v-slot="{ navigate }">
      <page-header :title="state.pageTitle" @click="navigate">
        <template #extra>
          <refresh-button content="最大化显示">
            <el-button :icon="Monitor" size="small" circle @click="settingStore.fullScreen" />
          </refresh-button>
        </template>
      </page-header>
    </router-link>
    <div>
      <el-affix :offset="settingStore.maximize ? 0 : 50" :z-index="1">
        <text-editor-toolsbar editorId="editor" />
      </el-affix>
      <page-main style="max-width: 1000px; margin: 30px auto 0 auto" padding="30px 20px 20px" v-loading="state.loading">
        <input v-model="formData.title" autofocus="autofocus" placeholder="请输入标题" class="title" />
        <el-divider />
        <text-editor
          v-if="state.type === 'add' || formData.content.length"
          v-model="formData.content"
          editorId="editor"
          placeholder="请输通知公告内容"
        />
        <fixed-action-bar style="text-align: center">
          <router-link custom :to="{ name: 'Notice' }" v-slot="{ navigate }">
            <el-button @click="navigate">取消</el-button>
          </router-link>
          <el-button type="primary" @click="onClickChange">确认提交</el-button>
        </fixed-action-bar>
      </page-main>
    </div>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router'
import { reactive } from 'vue'
import { add, edit, info } from '@/api/notice/index'
import { useSettingStore } from '@/store/modules/setting'
import { Monitor } from '@element-plus/icons-vue'
import { ElMessage, ElNotification, ElMessageBox } from 'element-plus'
const settingStore = useSettingStore()
const route = useRoute()
const router = useRouter()
const state = reactive({
  loading: false,
  pageTitle: '',
  type: 'add',
  id: null,
})

const formData = reactive({
  title: '',
  content: [],
})

// 新增/修改验证
const onClickChange = async () => {
  try {
    if (!formData.title) return ElMessage.warning('标题不能为空！')
    if (!formData.content) return ElMessage.warning('内容不能为空！')

    state.type === 'add' ? submitHandleChange(add, formData) : submitHandleChange(edit, { ...formData, id: state.id }, '修改')
  } catch (err) {
    console.log(err)
  }
}

async function submitHandleChange(fn, formData = {}, text = '新增') {
  try {
    state.loading = true
    const res = await fn(formData)
    ElNotification.success({
      title: '提示',
      message: res.message,
    })
    setTimeout(async () => {
      await ElMessageBox.confirm(`${text}成功，是否退出${text}页？`, '提示', { type: 'warning' })
      router.push({ name: 'Notice' })
    }, 500)
  } finally {
    state.loading = false
  }
}

//获取详情
const getInfo = () => {
  state.loading = true
  info({ id: state.id })
    .then(res => {
      console.log(res)
      const { title, content } = res.data
      formData.title = title
      formData.content = content
    })
    .finally(() => (state.loading = false))
}

const init = () => {
  const { params, name, meta } = route
  state.pageTitle = meta.title
  if (name === 'NoticeAdd') return (state.type = 'add')
  state.type = 'edit'
  state.id = params.id
  getInfo()
}
init()
</script>

<style lang="scss" scoped>
.title {
  font-size: 30px;
  border: 0;
  outline: none;
  width: 100%;
  line-height: 1;

  &::placeholder {
    color: #d4d4d4;
  }
}
</style>
