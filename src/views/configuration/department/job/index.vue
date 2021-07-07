<template>
  <div>
    <page-header content="职位管理" @back="toRouter({ name: 'Department' })" />

    <div class="page-main">
      <tools-bar add @on-add="toRouter({ name: 'JobAddOrEdit' })" />
      <el-table
        border
        :data="tableData.list"
        v-loading="tableData.tableLoading"
      >
        <el-table-column prop="name" label="职位" min-width="180" />

        <el-table-column
          prop="status"
          label="状态"
          min-width="120"
          align="center"
        >
          <template #default="{ row }">
            <my-switch
              @on-success="row.status = row.status ? 0 : 1"
              :api="jobSwitch"
              :status="row.status"
              :id="row.id"
              active-text="启用"
              inactive-text="禁用"
              :disabled="row.disabled"
            />
          </template>
        </el-table-column>

        <el-table-column
          prop="address"
          label="操作"
          align="center"
          min-width="120"
        >
          <template #default="{ row, $index }">
            <el-button
              type="warning"
              size="small"
              @click="editChange(row)"
              :disabled="row.disabled"
            >
              编辑
            </el-button>

            <el-button
              type="danger"
              size="small"
              @click="delChange(row, $index)"
              :loading="row.disabled"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-model:pageSize="tableData.pageSize"
        :total="tableData.total"
        v-model:currentPage="tableData.currentPage"
        @on-change="getListData"
      />
    </div>
  </div>
</template>
<script>
import { reactive, onMounted } from "vue";
import { job, jobSwitch, departmentDel } from "@/api/department/job";
import { toRouter, messageBoxChange } from "@/hooks";
import { ElNotification } from "element-plus";

export default {
  setup() {
    const search = reactive({
      keywords: null,
    });
    const tableData = reactive({
      pageSize: 10, //每页数量
      total: 0, //总条数
      currentPage: 1, //当前页
      tableLoading: false,
      list: [],
    });

    const editChange = (row) => {
      toRouter({
        name: "JobAddOrEdit",
        query: { type: "edit", name: row.name, id: row.id },
      });
    };

    const delChange = async (row, index) => {
      try {
        await messageBoxChange("此操作将永久删除该数据, 是否继续?");
        row.disabled = true;
        const res = await departmentDel({ id: row.id });
        tableData.list.splice(index, 1);

        ElNotification({
          title: "提示",
          message: res.message,
          type: "success",
        });
        row.disabled = false;
      } catch (err) {
        console.log(err);
        row.disabled = false;
      }
    };

    const getListData = () => {
      tableData.tableLoading = true;
      job()
        .then((res) => {
          console.log(res);
          const { total, current_page, list } = res.data;
          tableData.total = total;
          tableData.currentPage = current_page;
          tableData.list = list;
        })
        .finally(() => (tableData.tableLoading = false));
    };

    onMounted(() => {
      getListData();
    });
    return {
      search,
      tableData,
      editChange,
      toRouter,
      jobSwitch,
      getListData,
      delChange,
    };
  },
};
</script>
<style lang="scss" scoped></style>
