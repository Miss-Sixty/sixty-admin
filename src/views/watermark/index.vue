<template>
  <div class="watermark-content">
    <page-header no-icon title="页面水印" content="给页面的某个区域加上水印。" />

    <page-main title="前置水印" style="margin: 20px">
      <el-alert
        style="margin-bottom: 20px"
        title="水印组件默认实现为前置水印，即设想水印会显示在内容的上方，zIndex 默认设置为
        9，如果你不希望水印遮挡上层内容，可以调整该值到小于上层内容的 zIndex。"
        type="warning"
        :closable="false"
      />

      <watermark>
        <el-table :data="tableData">
          <el-table-column prop="date" label="日期" width="180"> </el-table-column>
          <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
      </watermark>
    </page-main>

    <page-main title="图片水印" style="margin: 20px">
      <el-alert
        style="margin-bottom: 20px"
        title="通过 image 指定图片地址。为保证图片高清且不被拉伸，请传入水印图片的宽高 width 和 height, 并上传至少两倍的宽高的 logo 图片地址。
     "
        type="warning"
        :closable="false"
      />

      <watermark height="36" width="115" image="https://gw.alipayobjects.com/zos/bmw-prod/59a18171-ae17-4fc5-93a0-2645f64a3aca.svg">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180"> </el-table-column>
          <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
      </watermark>
    </page-main>
  </div>
</template>
<script setup>
const tableData = [
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄',
  },
  {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄',
  },
  {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄',
  },
]
</script>

<style lang="scss" scoped>
.page-main {
  padding-top: 0;
}
</style>
