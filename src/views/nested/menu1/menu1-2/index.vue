<template>
  <div style="padding: 30px">
    <el-alert :closable="false" title="menu 1-2" type="warning" effect="dark">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </el-alert>
  </div>
</template>
