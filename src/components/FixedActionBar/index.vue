<template>
  <el-affix position="bottom" class="fixed-adtion-bar">
    <slot />
  </el-affix>
</template>
<style lang="scss" scoped>
.fixed-adtion-bar {
  padding: 20px;
  text-align: center;
  background-color: #fff;
}
</style>
