<template>
  <el-drawer title="系统设置" :size="360" append-to-body>
    <el-row :gutter="10">
      <el-col :span="8" v-for="(item, index) in themeData" :key="index">
        <el-row
          role="button"
          class="card"
          justify="space-between"
          align="middle"
          :class="{ isActive: item.type === theme }"
          @click="handleTheme(item)"
        >
          <span>{{ item.text }}</span>
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
        </el-row>
      </el-col>
    </el-row>

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
      <el-switch v-model="exhibit.grayMode" @change="toggleName('gray-mode', $event)" />
    </div>
  </el-drawer>
</template>
<script setup>
import { reactive, ref, shallowRef, computed } from 'vue'
import { Monitor } from '@element-plus/icons'
import { usePreferredDark, useStorage } from '@vueuse/core'
const isDarkPreferred = usePreferredDark()
const darkStorage = useStorage('theme', 'auto')

const themeData = shallowRef([
  {
    text: '浅色主题',
    icon: 'sun-fill-icon',
    type: 'light',
  },
  {
    text: '深色主题',
    icon: 'moon-clear-fill-icon',
    type: 'dark',
  },
  {
    text: '系统主题',
    icon: Monitor,
    type: 'auto',
  },
])

//主题
const theme = computed(() => darkStorage.value)
const handleTheme = item => {
  darkStorage.value = item.type
  if (item.type === 'auto') return toggleName('dark', isDarkPreferred.value)
  toggleName('dark', item.type === 'dark')
}

//功能按钮
const reset = ref(false)

//界面显示
const exhibit = reactive({
  grayMode: false,
})

const toggleName = (name, bl) => {
  const htmlEl = window?.document.querySelector('html')
  htmlEl?.classList.toggle(name, bl)
}
</script>

<style lang="scss" scoped>
.card {
  background-color: #eee;
  border-radius: 4px;
  padding: 12px 10px;
  transition: color 0.3s, background-color 0.3s;

  &.isActive {
    color: #fff;
    background-color: #409eff;
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
</style>
