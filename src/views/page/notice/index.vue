<template>
  <page-main style="margin: 20px" :header-border="false" padding="0 20px 20px">
    <template #header>
      <el-row justify="space-between" align="middle">
        <span style="font-size: 16px">通知公告列表</span>
        <el-row align="middle">
          <router-link custom :to="{ name: 'NoticeAdd' }" v-slot="{ navigate }">
            <el-button size="small" :icon="Plus" type="primary" @click="navigate"> 新 增 </el-button>
          </router-link>
          <refresh-button content="刷新表格数据" @click="getListData" />
        </el-row>
      </el-row>
    </template>
    <el-table v-loading="tableData.loading" :data="tableData.list" @current-change="handleCurrentChange">
      <el-table-column type="index" label="序号" align="center" />
      <el-table-column prop="title" label="公告标题" />
      <el-table-column prop="name" label="发布人" width="80" align="center" />
      <el-table-column prop="date" label="发布时间" width="180" align="center" />
    </el-table>

    <fixed-action-bar>
      <pagination
        v-model:pageSize="tableData.page_size"
        v-model:currentPage="tableData.current_page"
        :total="tableData.total"
        @on-change="getListData"
      />
    </fixed-action-bar>
  </page-main>
</template>
<script setup>
import { reactive } from 'vue'
import { list } from '@/api/notice/index'
import { Plus } from '@element-plus/icons-vue'
import useListData from '@/hooks/useListData'
import { useRouter } from 'vue-router'
const router = useRouter()
const tableData = reactive({
  page_size: 10, //每页数量
  total: 0, //总条数
  current_page: 1, //当前页
  loading: false,
  list: [],
})

const handleCurrentChange = row => router.push({ name: 'NoticeInfo', params: { id: row.id } })

/**
 * 获取列表数据、删除列表数据
 * api：list-列表api del-删除api
 * tableData：分页数据和列表数据
 * tableQuery：列表参数
 * omit：循环写入tableData数据时排除的参数
 */
const { getListData } = useListData({ list }, tableData)
getListData()
</script>

<style lang="scss" scoped>
::v-deep(.el-table__row) :hover {
  cursor: pointer;
}
</style>
