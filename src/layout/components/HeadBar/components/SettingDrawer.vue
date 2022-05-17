<script setup>
import { ref, watch } from 'vue'
import { Setting, DocumentCopy } from '@element-plus/icons-vue'
import { useSettingsStore } from '@/stores/setting'
import settingBase from '@/setting'
import { useClipboard } from '@vueuse/core'
const settingsStore = useSettingsStore()
const drawer = ref(false)

const { copy, copied, isSupported } = useClipboard()
watch(copied, (val) => val && ElMessage.success('复制成功，请粘贴到 @/src/setting.js 文件中！'))

const btnList = [
  {
    title: '导航折叠按钮',
    model: 'enableSidebarCollapse',
  },
  {
    title: '面包屑导航',
    model: 'enableBreadcrumb',
  },
  {
    title: '通知中心',
    model: 'enableNotification',
  },
  {
    title: '页面刷新',
    model: 'enablePageReload',
  },
  {
    title: '全屏',
    model: 'enableFullscreen',
  },
  {
    title: '设置',
    model: 'enableSetting',
  },
  {
    title: '暗黑模式切换',
    model: 'enableDarkSwitch',
  },
]
</script>

<template>
  <div class="drawer">
    <el-tooltip content="设置">
      <el-icon :size="18" class="bg" @click="drawer = true"> <Setting /> </el-icon>
    </el-tooltip>

    <el-drawer title="应用配置" :size="360" v-model="drawer">
      <el-scrollbar>
        <el-alert
          title="应用配置可实时预览效果，但仅是临时生效，要想真正作用于项目，可以点击下方的“复制配置”按钮，将配置粘贴到 @/src/setting.js 中即可。同时建议在生产环境隐藏应用配置功能。"
          type="error"
          :closable="false"
        />

        <el-divider>工具栏</el-divider>
        <div v-for="(item, index) in btnList" :key="index" class="setting-item">
          <span>{{ item.title }}</span>
          <el-switch v-model="settingsStore.header[item.model]" />
        </div>
      </el-scrollbar>

      <el-affix v-if="isSupported" position="bottom">
        <el-button style="width: 100%" :icon="DocumentCopy" type="primary" @click="copy(JSON.stringify(settingBase, null, 2))">
          复制配置
        </el-button>
      </el-affix>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.drawer {
  .card {
    background-color: #eee;
    border-radius: 4px;
    padding: 12px 10px;
    transition: color 0.3s, background-color 0.3s;
    cursor: pointer;
    &.isActive {
      color: #fff;
      background-color: #409eff;
    }
  }

  .setting-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding: 0px 10px;
    border-radius: 5px;
    transition: background-color 0.3s;
    &:not(:last-child) {
      margin-bottom: 5px;
    }
    &:hover {
      background-color: var(--el-color-primary-light-9);
    }
  }
  :deep(.el-drawer__header) {
    margin-bottom: initial;
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd;
  }
  :deep(.el-drawer__body) {
    display: flex;
    flex-direction: column;
  }
}
</style>
