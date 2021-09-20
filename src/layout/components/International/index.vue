<template>
  <el-dropdown>
    <el-icon role="button" class="header-icon">
      <international />
    </el-icon>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>待开发</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup></script>

<style lang="scss" scoped>
.header-icon {
  box-sizing: content-box;
  font-size: 18px;
  display: flex;
  padding: 0 8px;
  height: $headbar-height;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
  color: var(--c-text-1);
  transition: color 0.25s;
}
</style>
