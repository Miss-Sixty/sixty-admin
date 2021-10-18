<template>
  <div class="tabs-bar">
    <el-scrollbar style="flex: 1">
      <div class="tabs">
        <div class="box" v-for="item in getTabsList" :key="item">
          <Dropdown :tab-item="item" />
        </div>
      </div>
    </el-scrollbar>
    <div class="icons">
      <Dropdown isExtra :tabItem="$route" />
      <el-icon :size="18" role="button" @click="handleFold">
        <maximize />
      </el-icon>
    </div>
  </div>
</template>

<script setup>
import { useSettingStore } from '@/store/modules/setting'
import { useMultipleTabStore } from '@/store/modules/multipleTab'
import { computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Dropdown from './components/Dropdown.vue'

const router = useRouter()
const route = useRoute()
const handleFold = useSettingStore().fullScreen
const tabStore = useMultipleTabStore()
const getTabsList = computed(() => tabStore.tabList)

//设置固定tab
const addAffixTabs = () => {
  router.getRoutes().forEach(item => {
    if (item?.meta?.affix) tabStore.addTab(item)
  })
}

addAffixTabs()

watch(
  () => route.path,
  () => tabStore.addTab(route),
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.tabs-bar {
  display: flex;
  background-color: #fff;
  box-shadow: 0 0 1px #ccc;
  z-index: 4;
  position: relative;
  .tabs {
    height: $tabs-bar-height;
    display: inline-flex;
    align-items: center;
    padding: 0 15px;
  }

  .icons {
    display: flex;
    align-items: center;
    background-color: #fff;
    > * {
      box-sizing: content-box;
      height: $tabs-bar-height;
      font-size: 18px;
      display: flex;
      padding: 0 10px;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s;
      &:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }
    }
  }
}
</style>
