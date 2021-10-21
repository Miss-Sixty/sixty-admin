<template>
  <el-pagination
    :current-page="currentPage"
    :page-sizes="[10, 15, 20, 30]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script>
export default {
  name: 'Pagination',
}
</script>

<script setup>

defineProps({
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
})

const emit = defineEmits(['update:pageSize', 'on-change', 'update:currentPage'])

//每页几条
const handleSizeChange = val => {
  console.log(`每页 ${val} 条`)
  emit('update:pageSize', val)
  emit('on-change')
}

//跳转第几页
const handleCurrentChange = val => {
  console.log(`当前页: ${val}`)
  emit('update:currentPage', val)
  emit('on-change')
}
</script>
