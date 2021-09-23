<template>
  <div>
    <page-header no-icon title="全屏功能" content="扩大可视范围和操作区域，能更专注于主页面上的操作。浏览器全屏使用插件 VueuUse 。">
      <template #extra>
        <a target="_blank" href="https://vueuse.org/core/useFullscreen/">
          <el-button type="primary" size="small">VueuUse 文档</el-button>
        </a>
      </template>
    </page-header>

    <page-main title="全屏" style="margin: 20px">
      <el-alert
        style="margin-bottom: 20px"
        title="进入浏览器全屏，使用 VueuUse 的 useFullscreen 功能。"
        type="warning"
        :closable="false"
      />

      <el-button @click="enter">进入全屏</el-button>
      <el-button @click="toggle">进入全屏/退出全屏</el-button>
      <el-button @click="exit">退出全屏</el-button>
      <span style="margin-left: 10px">是否全屏:{{ isFullscreen }}</span>
    </page-main>

    <div ref="domRef">
      <page-main title="部分区域全屏" style="margin: 20px">
        <el-alert
          style="margin-bottom: 20px"
          title="部分区域进入浏览器全屏，使用 VueuUse 的 useFullscreen
          功能。"
          type="warning"
          :closable="false"
        />

        <el-row justify="center" align="center">
          <el-button @click="toggleDom">进入全屏/退出全屏</el-button>
        </el-row>
      </page-main>
    </div>

    <page-main title="主页全屏" style="margin: 20px">
      <el-alert style="margin-bottom: 20px" title="隐藏菜单树和头部操作栏，使主页扩大到全屏幕。" type="warning" :closable="false" />

      <el-row justify="center" align="center">
        <el-button @click="handleFold">主页最大化/退出最大化</el-button>
      </el-row>
    </page-main>
  </div>
</template>
<script setup>
import { useFullscreen } from '@vueuse/core'
import { ref } from 'vue'
import { useSettingStore } from '@/store/modules/setting'
const usettingStore = useSettingStore()
const handleFold = () => {
  usettingStore.$patch(state => {
    const getIsUnFold = !state.menuSetting.show && !state.headerSetting.show
    state.menuSetting.show = getIsUnFold
    state.headerSetting.show = getIsUnFold
  })
}

const domRef = ref(null)
const { toggle, enter, exit, isFullscreen } = useFullscreen()
const { toggle: toggleDom } = useFullscreen(domRef)
</script>
