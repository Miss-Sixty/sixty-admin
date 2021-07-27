<template>
  <div class="watermark-content">
    <page-header icon="none" icon-text="none" title="页面水印" content="给页面的某个区域加上水印。" />

    <div class="page-main">
      <page-header
        icon="none"
        icon-text="none"
        title="前置水印"
        content="水印组件默认实现为前置水印，即设想水印会显示在内容的上方，zIndex 默认设置为 9，如果你不希望水印遮挡上层内容，可以调整该值到小于上层内容的 zIndex。"
      />
      <watermark>
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
      </watermark>

      <six-pagination
        v-model:pageSize="tableData.pageSize"
        v-model:currentPage="tableData.currentPage"
        :total="tableData.total"
        @on-change="getListData"
      />
    </div>

    <div class="page-main">
      <page-header
        icon="none"
        icon-text="none"
        title="图片水印"
        content="通过 image 指定图片地址。为保证图片高清且不被拉伸，请传入水印图片的宽高 width 和 height, 并上传至少两倍的宽高的 logo 图片地址。"
      />
      <watermark height="36" width="115" image="https://gw.alipayobjects.com/zos/bmw-prod/59a18171-ae17-4fc5-93a0-2645f64a3aca.svg">
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
      </watermark>

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
import { shallowReactive } from 'vue'
import { list } from '@/api/list'
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

<style lang="scss" scoped>
.page-main {
  padding-top: 0;
}
</style>
