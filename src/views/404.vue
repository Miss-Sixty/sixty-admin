<template>
  <el-result title="404" sub-title="抱歉，您访问的页面不存在。" icon="info">
    <template #extra>
      <router-link v-slot="{ navigate }" custom to="/">
        <el-button type="primary" @click="navigate">返回首页</el-button>
      </router-link>
    </template>
  </el-result>
</template>
