<template>
  <el-page-header :content="content" class="header" @back="$emit('back')" />
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    content: String,
  },
  emits: ['back'],
}
</script>

<style lang="scss" scoped>
.header {
  padding: 26px 20px;
  background: #fff;
}
</style>
