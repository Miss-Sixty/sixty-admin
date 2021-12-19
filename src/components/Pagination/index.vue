<template>
  <el-pagination
    style="padding: 20px 0;"
    :page-sizes="[10, 15, 20, 30]"
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="$emit('on-change')"
    @current-change="$emit('on-change')"
  />
</template>

<script>
export default {
  name: 'Pagination'
}
</script>

<script setup>
defineEmits([ 'on-change'])
</script>
