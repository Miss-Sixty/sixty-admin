<template>
  <div>
    <page-header icon="none" icon-text="none" title="分页组件" content="数据的分页控制，多和表格配合使用。" />
    <div class="page-main">
      <el-table v-loading="tableData.loading" :data="tableData.list">
        <el-table-column prop="date" label="日期" width="180" align="center" />
        <el-table-column prop="name" label="姓名" width="180" align="center" />
        <el-table-column prop="address" label="禁用/启用" width="180" align="center">
          <template #default="{ row }">
            <confirm-switch
              :id="row.id"
              :api="swichtChange"
              :text="`确定要「${row.status ? '禁用' : '启用'}」该数据吗？`"
              :status="row.status"
              @on-success="row.status = !row.status"
            />
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址" />
      </el-table>

      <six-pagination
        v-model:pageSize="tableData.pageSize"
        v-model:currentPage="tableData.currentPage"
        :total="tableData.total"
        @on-change="getListData"
      />
    </div>
  </div>
</template>
<script setup>
import { list } from '@/api/list'
import { shallowReactive } from 'vue'
// shallowReactive 只响应第一层的数据，第二层则不监测响应式
const tableData = shallowReactive({
  pageSize: 10, //每页数量
  total: 0, //总条数
  currentPage: 1, //当前页
  loading: true,
  list: [],
})

const swichtChange = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        message: '更改成功！',
      })
    }, 1000)
  })
}

const getListData = () => {
  tableData.loading = true
  list()
    .then(res => {
      console.log(res)
      const { total, current_page, list } = res.data
      tableData.total = total
      tableData.currentPage = current_page
      tableData.list = list
    })
    .finally(() => (tableData.loading = false))
}

getListData()
</script>
