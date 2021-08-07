<template>
  <div>
    <search-bar v-model:keywords="search.keywords" keywords-text="搜索员工姓名" @on-search="onSearchChange" @on-reset="onResetChange">
      <el-select v-model="search.status" placeholder="筛选 禁用/启用">
        <el-option label="禁用" :value="0" />
        <el-option label="启用" :value="1" />
      </el-select>
    </search-bar>

    <six-card title="员工列表">
      <template #btn>
        <el-button size="small" icon="el-icon-plus" type="primary" @click="toRouter('TableAdd')"> 新 增 </el-button>
        <el-tooltip effect="light" content="刷新表格数据" placement="bottom">
          <el-icon class="headbar__icon" :size="20" @click="getListData">
            <refresh-line />
          </el-icon>
        </el-tooltip>
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

        <el-table-column prop="address" label="操作" align="center" min-width="160" fixed="right">
          <template #default="{ row, $index }">
            <el-button :disabled="row.disabled" type="warning" size="small" @click="toRouter('TableEdit', { id: row.id })">
              编辑
            </el-button>

            <el-button :loading="row.disabled" style="margin-right: 10px" type="danger" size="small" @click="delChange(row, $index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <six-pagination
        v-model:pageSize="tableData.pageSize"
        v-model:currentPage="tableData.currentPage"
        :total="tableData.total"
        @on-change="getListData"
      />
    </six-card>
  </div>
</template>
<script setup>
import { list, del, status } from '@/api/list'
import { reactive, shallowReactive } from 'vue'
import useSearch from '@/hooks/useSearch'
import { toRouter, messageBoxChange } from '@/hooks'
import { ElNotification } from 'element-plus'
const search = reactive({
  keywords: null,
  status: null,
})

// shallowReactive 只响应第一层的数据，第二层则不监测响应式
const tableData = shallowReactive({
  pageSize: 10, //每页数量
  total: 0, //总条数
  currentPage: 1, //当前页
  loading: true,
  list: [],
})

//搜索/重置
const { onSearchChange, onResetChange } = useSearch(tableData.currentPage, getListData, search)

// 删除
const delChange = async (row, index) => {
  try {
    await messageBoxChange('此操作将永久删除该数据, 是否继续?')
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

function getListData() {
  tableData.loading = true
  list({ currentPage: tableData.currentPage, ...search })
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
<style lang="scss" scoped>
.headbar__icon {
  cursor: pointer;
  margin-left: 10px;
}
</style>
