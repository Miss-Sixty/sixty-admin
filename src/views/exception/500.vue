<template>
  <el-result title="500" sub-title="抱歉，服务器报告错误。" icon="error">
    <template #extra>
      <router-link custom :to="{ name: 'Home' }" v-slot="{ navigate }">
        <el-button type="primary" size="medium" @click="navigate">返回首页</el-button>
      </router-link>
    </template>
  </el-result>
</template>
