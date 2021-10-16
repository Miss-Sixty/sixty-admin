<template>
  <el-result title="403" sub-title="抱歉，您无权访问此页面。" icon="warning">
    <template #extra>
      <router-link custom :to="{ name: 'Home' }" v-slot="{ navigate }">
        <el-button type="primary" size="medium" @click="navigate">返回首页</el-button>
      </router-link>
    </template>
  </el-result>
</template>
