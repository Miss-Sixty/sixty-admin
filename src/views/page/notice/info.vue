<template>
  <div v-loading="state.loading">
    <router-link custom :to="{ name: 'Notice' }" v-slot="{ navigate }">
      <page-header title="公告详情" @click="navigate">
        <template #extra>
          <div v-if="state.id">
            <template v-if="state.is_operate">
              <router-link custom :to="{ name: 'NoticeEdit', params: { id: state.id } }" v-slot="{ navigate }">
                <el-button :disabled="state.delLoading" type="warning" size="small" :icon="Edit" circle @click="navigate" />
              </router-link>
              <el-popconfirm title="确认要删除该篇通知公告吗？" @confirm="getDel">
                <template #reference>
                  <el-button :loading="state.delLoading" size="small" type="danger" :icon="Delete" circle />
                </template>
              </el-popconfirm>
            </template>
            <refresh-button content="最大化显示">
              <el-button :icon="Monitor" size="small" circle @click="handleFold" />
            </refresh-button>
          </div>
        </template>
      </page-header>
    </router-link>
    <page-main class="content" style="max-width: 1000px; margin: 30px auto 0 auto" padding="30px 20px 20px">
      <h2 style="text-align: center">{{ infoData.title }}</h2>
      <p style="text-align: center; color: rgba(0, 0, 0, 0.5)">
        <span style="margin-right: 20px">发布人：{{ infoData.name }}</span>
        <span>时间：{{ infoData.date }}</span>
      </p>
      <div v-html="infoData.content" />
    </page-main>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import useForInData from '@/hooks/useForInData'
import { reactive } from 'vue'
import { info, del } from '@/api/notice/index'
import { Monitor, Delete, Edit } from '@element-plus/icons'
import { useSettingStore } from '@/store/modules/setting'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { createEditor } from '@wangeditor/editor'

const router = useRouter()
const route = useRoute()
const handleFold = useSettingStore().fullScreen
const state = reactive({
  loading: false,
  info: {},
  id: null,
  delLoading: false,
  createAdminId: null,
  is_operate: false,
  isAjaxDone: false,
})
const infoData = reactive({
  title: '',
  name: '',
  content: '',
  date: '',
})

//删除
const getDel = () => {
  state.delLoading = true
  del({ id: state.id })
    .then(res => {
      ElNotification.success({
        title: '提示',
        message: res.message,
      })
      router.push({ name: 'Notice' })
    })
    .finally(() => (state.delLoading = false))
}

//获取详情
const getInfo = () => {
  state.loading = true
  console.log(route.params)
  info(route.params)
    .then(res => {
      console.log(res)
      useForInData(res.data, infoData, ['content'])
      const { content, name, id, is_operate } = res.data
      infoData.name = name
      state.id = id
      state.is_operate = is_operate
      const editor = createEditor(content)
      console.log(editor.getHtml())
      infoData.content = editor.getHtml()
    })
    .finally(() => (state.loading = false))
}

getInfo()
</script>

<style scoped lang="scss">
::v-deep(.content) {
  video {
    max-width: 100%;
  }

  /* 表格 */
  table {
    border-collapse: collapse;
  }
  table th,
  table td {
    border: 1px solid #ccc;
    min-width: 50px;
    height: 20px;
    text-align: left;
  }
  table th {
    background-color: #f1f1f1;
    text-align: center;
  }

  /* 引用 */
  blockquote {
    display: block;
    border-left: 8px solid #d0e5f2;
    padding: 10px 10px;
    margin: 10px 0;
    background-color: #f1f1f1;
  }

  /* 列表 */
  ul,
  ol {
    margin: 10px 0 10px 20px;
  }

  /* 分割线 */
  hr {
    display: block;
    width: 90%;
    margin: 20px auto;
    border: 0;
    height: 1px;
    background-color: #ccc;
  }
}
</style>
