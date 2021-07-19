<template>
  <div>
    <page-header content="职位管理" @back="toRouter({ name: 'Department' })" />

    <div class="page-main">
      <tools-bar add @on-add="toRouter({ name: 'JobAddOrEdit' })" />
      <el-table v-loading="tableData.tableLoading" border :data="tableData.list">
        <el-table-column prop="name" label="职位" min-width="180" />

        <el-table-column prop="status" label="状态" min-width="120" align="center">
          <template #default="{ row }">
            <my-switch
              :id="row.id"
              :api="jobSwitch"
              :status="row.status"
              active-text="启用"
              inactive-text="禁用"
              :disabled="row.disabled"
              @on-success="row.status = row.status ? 0 : 1"
            />
          </template>
        </el-table-column>

        <el-table-column prop="address" label="操作" align="center" min-width="120">
          <template #default="{ row, $index }">
            <el-button :disabled="row.disabled" type="warning" size="small" @click="editChange(row)"> 编辑 </el-button>
            <el-button :loading="row.disabled" type="danger" size="small" @click="delChange(row, $index)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-model:currentPage="tableData.currentPage"
        v-model:pageSize="tableData.pageSize"
        :total="tableData.total"
        @on-change="getListData"
      />
    </div>
  </div>
</template>
<script>
import { reactive, onMounted } from 'vue'
import { job, jobSwitch } from '@/api/department/job'
import { toRouter } from '@/hooks'

export default {
  setup() {
    const search = reactive({
      keywords: null,
    })
    const tableData = reactive({
      pageSize: 10, //每页数量
      total: 0, //总条数
      currentPage: 1, //当前页
      tableLoading: false,
      list: [],
    })

    const editChange = row => {
      toRouter({
        name: 'JobAddOrEdit',
        query: { type: 'edit', name: row.name, id: row.id },
      })
    }

    const delChange = async () => {}

    const getListData = () => {
      tableData.tableLoading = true
      job()
        .then(res => {
          console.log(res)
          const { total, current_page, list } = res.data
          tableData.total = total
          tableData.currentPage = current_page
          tableData.list = list
        })
        .finally(() => (tableData.tableLoading = false))
    }

    onMounted(() => {
      getListData()
    })
    return {
      search,
      tableData,
      editChange,
      toRouter,
      jobSwitch,
      getListData,
      delChange,
    }
  },
}
</script>
<style lang="scss" scoped></style>
