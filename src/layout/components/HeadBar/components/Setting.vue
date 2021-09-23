<template>
  <el-tooltip content="设置" placement="bottom" effect="light">
    <el-icon class="header-icon" role="button" @click="drawer = true" :modal="false">
      <setting />
    </el-icon>
  </el-tooltip>

  <el-drawer v-model="drawer" title="系统设置">
    <div class="body">
      <el-divider>主题风格</el-divider>
      <!-- <dark-switch /> -->
      <div class="theme">
        <div class="card" v-for="(item, index) in themeData" :key="index">
          <span>{{ item.text }}</span>
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
        </div>
      </div>

      <el-divider>功能按钮</el-divider>
      <div class="setting-item">
        <span>通知中心</span>
        <el-switch v-model="reset" />
      </div>

      <div class="setting-item">
        <span>页面刷新</span>
        <el-switch v-model="reset" />
      </div>
      <div class="setting-item">
        <span>全屏</span>
        <el-switch v-model="reset" />
      </div>

      <div class="setting-item">
        <span>国际化</span>
        <el-switch v-model="reset" />
      </div>

      <el-divider>界面显示</el-divider>
      <div class="setting-item">
        <span>灰色模式</span>
        <el-switch v-model="reset" />
      </div>
    </div>
  </el-drawer>
</template>
<script setup>
import { ref, shallowRef } from 'vue'
import { Setting, Monitor } from '@element-plus/icons'
// import DarkSwitch from '@/layout/components/DarkSwitch'
const themeData = shallowRef([
  {
    text: '浅色主题',
    icon: 'sun-fill',
  },
  {
    text: '深色主题',
    icon: 'moon-clear-fill',
  },
  {
    text: '系统主题',
    icon: Monitor,
  },
])
const drawer = ref(false)
const reset = ref(false)
</script>

<style lang="scss" scoped>
.body {
  padding: 0 20px;

  .theme {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #eee;
      border-radius: 4px;
      padding: 12px 16px;
      > span {
        margin-right: 8px;
      }
    }
  }

  .setting-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px 0;
    padding: 5px 10px;
    border-radius: 5px;
    transition: background-color 0.3s;
    &:hover {
      background-color: #f1f1f1;
    }
  }
}
</style>
