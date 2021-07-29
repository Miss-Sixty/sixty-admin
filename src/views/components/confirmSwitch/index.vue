<template>
  <div>
    <page-header
      icon="none"
      icon-text="none"
      title="弹窗确认 Switch"
      content="二次封装 Switch 组件，使其拥有二次确认的功能。通常用在表格的禁用/启用中"
    />
    <div class="page-main">
      <el-table :data="tableData">
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
    </div>
  </div>
</template>
<script setup>
const tableData = [
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
    status: true,
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄',
    status: true,
  },
  {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄',
    status: false,
  },
  {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄',
    status: true,
  },
]

const swichtChange = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        message: '更改成功！',
      })
    }, 1000)
  })
}
</script>
