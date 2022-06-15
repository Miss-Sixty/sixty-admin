<script setup name="FixedActionBar"></script>

<template>
  <el-affix position="bottom" target="#app">
    <slot name="body">
      <el-row justify="center" class="content">
        <slot />
      </el-row>
    </slot>
  </el-affix>
</template>

<style lang="scss" scoped>
.content {
  background-color: #fff;
  padding: 20px;
}
</style>
