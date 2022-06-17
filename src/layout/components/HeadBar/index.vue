<script setup>
import DarkSwitch from '../DarkSwitch/index.vue'
import UserInfo from './components/UserInfo.vue'
import Notice from './components/Notice.vue'
import SettingDrawer from './components/SettingDrawer.vue'
import { useFullscreen } from '@vueuse/core'
import { Refresh, FullScreen, Fold } from '@element-plus/icons-vue'
import { useSettingsStore } from '@/stores/setting'
import { compile } from 'path-to-regexp'
import { Loading } from '@element-plus/icons-vue'
const settingsStore = useSettingsStore()
const route = useRoute()

// 通知
const noticeData = []

// 全屏
const { toggle, isFullscreen } = useFullscreen()

// 面包屑
const breadcrumbList = computed(() => {
  let breadcrumbList = [
    {
      path: '/home',
      title: '首页',
    },
  ]

  if (route.meta.breadcrumbNeste) {
    breadcrumbList.push(...route.meta.breadcrumbNeste)
  }
  return breadcrumbList
})

// 填充参数
function pathCompile(path) {
  let toPath = compile(path)
  return toPath(route.params)
}
</script>

<template>
  <div class="head-bar">
    <div class="left">
      <el-icon
        v-if="settingsStore.header.enableSidebarCollapse"
        class="sidebar-collapse bg"
        style="padding: 0 14px"
        :style="{ transform: settingsStore.collapse || settingsStore.mode === 'mobile' ? 'rotateY(180deg)' : 'rotateY(0)' }"
        @click="settingsStore.setCollapse"
        :size="18"
      >
        <Fold />
      </el-icon>

      <el-breadcrumb v-if="settingsStore.header.enableBreadcrumb && settingsStore.mode === 'pc'">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path" :to="pathCompile(item.path)">
            {{ item.title }}
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>

    <div class="right">
      <Notice v-if="settingsStore.header.enableNotification" :notice="noticeData" />

      <router-link v-if="settingsStore.header.enablePageReload" v-slot="{ navigate }" custom to="/reload">
        <el-tooltip content="刷新页面">
          <el-icon :size="18" class="bg" @click="navigate"> <Refresh /> </el-icon>
        </el-tooltip>
      </router-link>

      <el-tooltip v-if="settingsStore.header.enableFullscreen" :content="isFullscreen ? '退出全屏' : '全屏'">
        <el-icon :size="18" class="bg" @click="toggle"> <FullScreen /> </el-icon>
      </el-tooltip>
      <SettingDrawer v-if="settingsStore.header.enableSetting" />
      <el-tooltip v-if="settingsStore.header.enableDarkSwitch" content="切换暗黑模式">
        <DarkSwitch class="bg" />
      </el-tooltip>
      <Suspense>
        <UserInfo class="bg" />
        <template #fallback>
          <el-icon style="width: 104px" class="is-loading"><Loading /></el-icon>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.bg) {
  box-sizing: content-box;
  height: calc($headbar-height - 1px);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  padding: 0 8px;
  cursor: pointer;
  &:hover {
    background-color: var(--el-color-primary-light-9);
  }
}

.left {
  display: flex;
  align-items: center;
  .sidebar-collapse + .el-breadcrumb {
    margin-left: 0;
  }
  .el-breadcrumb {
    margin-left: 15px;
    white-space: nowrap;
  }
}
.right {
  display: flex;
  align-items: center;
}

// 面包屑动画
.breadcrumb-enter-active {
  transition: all 0.25s;
}
.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(30px) skewX(-50deg);
}
</style>
