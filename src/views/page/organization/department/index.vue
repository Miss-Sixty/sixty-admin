<template>
  <div>
    <search-bar v-model:keywords="search.keywords" keywords-text="搜索员工姓名" @on-search="onSearchChange" @on-reset="onResetChange">
      <el-select v-model="search.status" clearable placeholder="筛选 禁用/启用">
        <el-option label="禁用" :value="0" />
        <el-option label="启用" :value="1" />
      </el-select>
    </search-bar>

    <page-main title="表格" style="margin: 20px" :header-border="false" padding="0 20px 20px">
      <template #extra>
        <el-row align="middle">
          <el-button size="small" :icon="Plus" type="primary" @click="onCreateChange" style="margin-right: 16px"> 新 增 </el-button>

          <refresh-button content="刷新表格数据" @click="getListData" />
        </el-row>
      </template>

      <el-table v-loading="tableData.loading" :data="tableData.list">
        <el-table-column type="index" width="50" />
        <el-table-column prop="name" label="姓名" min-width="160" align="center" />
        <el-table-column prop="address" label="禁用/启用" min-width="160" align="center">
          <template #default="{ row }">
            <confirm-switch
              :id="row.id"
              :api="status"
              :text="`确定要「${row.status ? '禁用' : '启用'}」该数据吗？`"
              :status="row.status"
              @on-success="row.status = !row.status"
            />
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址" min-width="260" />
        <el-table-column prop="date" label="日期" min-width="180" align="center" />

        <el-table-column prop="address" label="操作" align="center" min-width="140" fixed="right">
          <template #default="{ row, $index }">
            <el-button
              :disabled="row.disabled"
              type="warning"
              size="small"
              icon="el-icon-edit"
              circle
              @click="$router.push({ name: 'TableEdit', params: { id: row.id } })"
            />

            <el-button
              :loading="row.disabled"
              type="danger"
              size="small"
              icon="el-icon-delete"
              circle
              @click="delChange(row, $index)"
            />
          </template>
        </el-table-column>
      </el-table>

      <fixed-action-bar>
        <pagination
          v-model:pageSize="tableData.pageSize"
          v-model:currentPage="tableData.currentPage"
          :total="tableData.total"
          @on-change="getListData"
        />
      </fixed-action-bar>
    </page-main>
  </div>
</template>
<script setup>
import { list, del, status } from '@/api/list'
import { reactive, shallowReactive } from 'vue'
import { ElMessageBox, ElNotification } from 'element-plus'
import useSearch from '@/hooks/useSearch'
import { useRouter } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'

const router = useRouter()

const search = reactive({
  keywords: null,
  status: null,
})

const tableData = shallowReactive({
  pageSize: 10, //每页数量
  total: 0, //总条数
  currentPage: 1, //当前页
  loading: true,
  list: [],
})

const formModeData = reactive({
  mode: 'router', //router-路由跳转 dialog-对话框 drawer-抽屉
  id: '',
  visible: false,
})

function onCreateChange() {
  if (formModeData.mode === 'router') {
    return router.push({
      name: 'departmentCreate',
    })
  }
  formModeData.id = ''
  formModeData.visible = true
}

const { onSearchChange, onResetChange } = useSearch(tableData.currentPage, getListData, search)

// 删除
async function delChange(row, index) {
  try {
    await ElMessageBox.confirm('确定要删除该项吗？', '提示', { type: 'warning' })
    row.disabled = true
    const res = await del({ id: row.id })
    tableData.list.splice(index, 1)
    tableData.total -= 1

    ElNotification({
      title: '提示',
      message: res.message,
      type: 'success',
    })
  } finally {
    row.disabled = false
  }
}

function getListData() {
  tableData.loading = true
  list({ currentPage: tableData.currentPage, ...search })
    .then(res => {
      const { total, current_page, list } = res.data
      tableData.total = total
      tableData.currentPage = current_page
      tableData.list = list
    })
    .finally(() => (tableData.loading = false))
}

getListData()
</script>
