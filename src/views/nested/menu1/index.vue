<template>
  <div style="padding: 30px">
    <el-alert :closable="false" title="菜单 1" type="success" effect="dark">
      <!-- TODO:<router-view> can no longer be used directly inside <transition> or <keep-alive>. -->
      <router-view />
    </el-alert>
  </div>
</template>
