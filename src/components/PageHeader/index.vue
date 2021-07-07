<template>
  <el-page-header @back="$emit('back')" :content="content" class="header" />
</template>

<script>
export default {
  name: "PageHeader",
  props: {
    content: String,
  },
};
</script>

<style lang="scss" scoped>
.header {
  padding: 26px 20px;
  background: #fff;
}
</style>
