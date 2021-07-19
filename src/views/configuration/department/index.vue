<template>
  <div class="page-main">
    <tools-bar add @on-add="toRouter({ name: 'DepartmentAddOrEdit' })" />
    <el-table v-loading="tableData.tableLoading" border :data="tableData.list">
      <el-table-column prop="name" label="部门" min-width="180" />

      <el-table-column prop="status" label="状态" min-width="120" align="center">
        <template #default="{ row }">
          <my-switch
            :id="row.id"
            :api="departmentSwitch"
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
          <el-button :disabled="row.disabled" size="small" @click="toRouter({ name: 'Job', query: { id: row.id } })">
            查看职位
          </el-button>

          <el-button :disabled="row.disabled" type="warning" size="small" @click="editChange(row)"> 编辑 </el-button>

          <el-button :loading="row.disabled" type="danger" size="small" @click="delChange(row, $index)"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-model:pageSize="tableData.pageSize"
      v-model:currentPage="tableData.currentPage"
      :total="tableData.total"
      @on-change="getListData"
    />
  </div>
</template>
<script>
import { reactive, onMounted } from 'vue'
import { department, departmentSwitch, departmentDel } from '@/api/department'
import { toRouter, messageBoxChange } from '@/hooks'
import { ElNotification } from 'element-plus'

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
        name: 'DepartmentAddOrEdit',
        query: { type: 'edit', name: row.name, id: row.id },
      })
    }

    const delChange = async (row, index) => {
      try {
        await messageBoxChange('此操作将永久删除该数据, 是否继续?')
        row.disabled = true
        const res = await departmentDel({ id: row.id })
        tableData.list.splice(index, 1)

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
      department()
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
      departmentSwitch,
      getListData,
      delChange,
    }
  },
}
</script>
<style lang="scss" scoped></style>
