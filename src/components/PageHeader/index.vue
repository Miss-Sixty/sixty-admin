<template>
  <div class="header">
    <div class="title">{{ title }}</div>
    <div class="content">
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  props: {
    title: {
      type: String,
      default: "标题",
    },
    content: String,
  },
};
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 20px;
  padding: 16px 20px;
  background: #fff;
  border-bottom: 1px solid #e8eaec;

  .title {
    font-size: 22px;
  }

  .content {
    color: #909399;
    font-size: 14px;
    margin-top: 10px;
  }
}
</style>
