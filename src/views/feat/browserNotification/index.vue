<template>
  <div>
    <page-header no-icon title="桌面通知">
      使用插件
      <el-link type="primary" href="https://pushjs.org/" target="_blank"> Push.js </el-link>
    </page-header>

    <el-alert title="无浏览器通知权限" type="error" v-if="isNotification === 'denied'">
      建议开启通知权限以及时获取后台通知。打开方法：设置->隐私设置和安全性->选择此网站->通知->允许
    </el-alert>

    <page-main style="margin: 20px">
      <p style="margin-top: 0">说明：default-未获得权限 granted-已获得权限 denied-已拒绝权限</p>
      <p style="margin-top: 0">当前通知权限：{{ appStore.permissionType }}</p>
      <el-button @click="browserPush"> 点击通知</el-button>
      <el-button @click="appStore.clearNotification"> 清除通知</el-button>
    </page-main>
  </div>
</template>
<script setup>
import { useAppStore } from '@/store/modules/app'
import imgUrl from '@/assets/logo.png'
import { computed } from 'vue'
const appStore = useAppStore()
const isNotification = computed(() => appStore.permissionType)

const browserPush = () => {
  appStore.notification({ icon: imgUrl, body: '这是一条来自后台的通知。' })
}
</script>
