<template>
  <div>
    <page-header no-icon title="桌面通知">
      使用插件
      <el-link type="primary" href="https://pushjs.org/" target="_blank"> Push.js </el-link>
      此功能只能在打开页面的时候使用，如果想要实现关闭网页的情况下推送消息则需要用到 serviceWorker 配合实现。
    </page-header>
    <el-alert title="无浏览器通知权限" type="error" v-if="isNotification === 'denied'">
      建议开启通知权限以及时获取后台通知。 打开方法：设置->隐私设置和安全性->选择此网站->通知->允许。 地址：chrome://settings/content
    </el-alert>
    <page-main style="margin: 20px">
      <p style="margin-top: 0">说明：default-未获得权限 granted-已获得权限 denied-已拒绝权限</p>
      <p style="margin-top: 0">当前通知权限：{{ appStore.permissionType }}</p>
      <el-button @click="browserPush">获取通知</el-button>
      <el-button @click="appStore.clearNotification">清除通知</el-button>
    </page-main>
  </div>
</template>
<script setup>
import { useAppStore } from '@/store/modules/app'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const appStore = useAppStore()
const isNotification = computed(() => appStore.permissionType)

const browserPush = () => {
  appStore.notification(null, { body: '您刚刚点击了获取通知。' }, function () {
    router.push({ name: 'Notice' })
    window.focus()
  })
}
</script>
