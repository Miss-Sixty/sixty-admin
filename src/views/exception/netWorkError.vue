<template>
  <el-result title="网络错误" sub-title="抱歉，您的网络连接已断开，请检查您的网络！" icon="error">
    <template #extra>
      <router-link custom :to="{ name: 'Reload' }" v-slot="{ navigate }">
        <el-button type="primary" size="medium" @click="navigate">返回首页</el-button>
      </router-link>
    </template>
  </el-result>
</template>
