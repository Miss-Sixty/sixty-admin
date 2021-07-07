<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[10, 15, 20, 30]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    style="margin-top: 20px"
  >
  </el-pagination>
</template>
<script>
export default {
  name: "Pagination",
  props: {
    pageSize: {
      //每页显示几条
      type: Number,
      default: 10,
    },
    total: {
      //共几条数据
      type: Number,
      default: 0,
    },
    currentPage: {
      //当前页
      type: Number,
      default: 1,
    },
  },
  setup(props, { emit }) {
    //每页几条
    const handleSizeChange = (val) => {
      console.log(`每页 ${val} 条`);
      emit("update:pageSize", val);
      emit("on-change");
    };

    //跳转第几页
    const handleCurrentChange = (val) => {
      console.log(`当前页: ${val}`);
      emit("update:currentPage", val);
      emit("on-change");
    };
    return {
      handleSizeChange,
      handleCurrentChange,
    };
  },
};
</script>
