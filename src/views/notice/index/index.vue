<template>
  <div>
    <page-main title="通知公告列表" style="margin: 20px" :header-border="false" padding="0 20px 20px">
      <template #extra>
        <el-row align="middle">
          <router-link custom :to="{ name: 'NoticeAdd' }" v-slot="{ navigate }">
            <el-button size="small" :icon="PlusIcon" type="primary" @click="navigate" style="margin-right: 16px"> 新 增 </el-button>
          </router-link>
          <refresh-button content="刷新表格数据" @click="getListData" />
        </el-row>
      </template>

      <el-table v-loading="tableData.tableLoading" :data="tableData.list">
        <el-table-column type="index" label="序号" align="center" />

        <el-table-column prop="title" label="公告标题" min-width="120" align="center" />

        <el-table-column prop="type" label="公告类型" min-width="120" align="center" />
        <el-table-column prop="aname" label="发布人" min-width="120" align="center" />
        <el-table-column prop="date" label="发布时间" min-width="150" align="center" />
        <el-table-column prop="text" label="公告内容" min-width="280" show-overflow-tooltip />
        <el-table-column prop="status" label="是否发布" min-width="120" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status ? 'success' : 'warning'">{{ row.status ? '已发布' : '未发布' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" align="center" min-width="180" fixed="right">
          <template #default="{ row, $index }">
            <router-link custom :to="{ name: 'NoticeEdit', params: { id: row.id } }" v-slot="{ navigate }">
              <el-button :disabled="row.disabled" type="warning" size="small" @click="navigate"> 编辑 </el-button>
            </router-link>

            <el-button :loading="row.disabled" type="danger" size="small" @click="delChange(row, $index)"> 删除 </el-button>
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
import { shallowReactive, computed } from 'vue'
import { list, del } from '@/api/notice/index'
import { ElNotification, ElMessageBox } from 'element-plus'
import { Plus as PlusIcon } from '@element-plus/icons'

const tableData = shallowReactive({
  pageSize: 10, //每页数量
  total: 0, //总条数
  currentPage: 1, //当前页
  tableLoading: false,
  list: [],
})

//删除
const delChange = async (row, index) => {
  try {
    await ElMessageBox.confirm('此操作将永久删除该数据, 是否继续?', '提示', { type: 'warning' })

    row.disabled = true
    const res = await del({ id: row.id })
    tableData.list.splice(index, 1)
    tableData.total -= 1

    ElNotification({
      title: '提示',
      message: res.message,
      type: 'success',
    })
    row.disabled = false
  } catch (err) {
    console.log(err)
    row.disabled = false
  }
}

const getListData = () => {
  tableData.tableLoading = true
  list()
    .then(res => {
      console.log(res)
      const { total, current_page, list } = res.data
      tableData.total = total
      tableData.currentPage = current_page
      tableData.list = list
    })
    .finally(() => (tableData.tableLoading = false))
}

getListData()
</script>
