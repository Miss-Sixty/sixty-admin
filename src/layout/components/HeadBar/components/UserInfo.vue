<script setup>
import { UserFilled } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const data = ref({})
try {
  const userInfo = await userStore.getUserInfo()
  data.value = userInfo.data
} catch {}
</script>

<template>
  <el-dropdown trigger="click">
    <el-row class="user" align="middle">
      <div class="user-wrapper">
        <p class="name">{{ data.name || '佚名' }}</p>
        <p class="job">{{ data.job || '暂无职位' }}</p>
      </div>
      <el-avatar :src="data.avatar" :size="35" />
    </el-row>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>系统设置</el-dropdown-item>
        <el-link style="font-weight: normal" :underline="false" href="https://miss-sixty.github.io/sixty-admin-docs/" target="_blank">
          <el-dropdown-item>项目文档</el-dropdown-item>
        </el-link>
        <el-dropdown-item divided @click="userStore.exitSystem">退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
.user {
  flex-wrap: nowrap;
  .user-wrapper {
    margin-right: 5px;
    text-align: right;

    p {
      margin: 0;
      line-height: 1;
      &.job {
        color: var(--el-text-color-secondary);
        font-size: 10px;
        margin-top: 4px;
      }
    }
  }
}
</style>
