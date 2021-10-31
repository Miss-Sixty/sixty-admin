<template>
  <div class="tabs-bar">
    <el-scrollbar ref="scrollbar" @scroll="scrollChange" style="flex: 1" view-class="tabs">
      <Dropdown v-for="item in getTabsList" :key="item" class="box" :tab-item="item">
        <router-link :ref="moveToCurrentTag" class="tab" role="button" exact-active-class="tab--active" :to="item">
          <span>{{ item?.meta?.title }}</span>
          <el-icon
            role="button"
            v-if="!item?.meta?.affix"
            :style="{ width: $route.path === item.path ? '18px' : '' }"
            @click.prevent.stop="closeTab(item)"
          >
            <close />
          </el-icon>
        </router-link>
      </Dropdown>
    </el-scrollbar>

    <div class="icons">
      <!-- <Dropdown isExtra :tabItem="$route">
        <el-icon class="icon" :size="18" role="button">
          <function-line-icon />
        </el-icon>
      </Dropdown> -->
      <el-icon class="icon" :size="18" role="button" @click="handleFold">
        <component :is="maximize ? 'minimize-icon' : 'maximize-icon'" />
      </el-icon>
    </div>
  </div>
</template>

<script setup>
import { useSettingStore } from '@/store/modules/setting'
import { useMultipleTabStore } from '@/store/modules/multipleTab'
import { computed, watch, ref, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Close } from '@element-plus/icons'
import { useIntersectionObserver, useTransition } from '@vueuse/core'
import Dropdown from './components/Dropdown.vue'
const settingStore = useSettingStore()
import { useElementSize } from '@vueuse/core'
const router = useRouter()
const route = useRoute()
const handleFold = settingStore.fullScreen
const maximize = computed(() => settingStore.maximize)
const tabStore = useMultipleTabStore()
const scrollLeft = ref(null)
const scrollChange = ({ left }) => (scrollLeft = left)

const closeTab = tabItem => tabStore.closeTab(route, router, tabItem)

const getTabsList = computed(() => {
  console.log(tabStore.tabList)

  return tabStore.tabList
})
const elDoms = ref([])
const scrollbar = ref(null)
const scrollWrapper = computed(() => useElementSize(scrollbar.value.$refs.resize).width)
//设置固定tab
const addAffixTabs = () => {
  router.getRoutes().forEach(item => {
    if (item?.meta?.affix) tabStore.addTab(item)
  })
}

addAffixTabs()

const moveToCurrentTag = el => {
  if (!elDoms.value.includes(el)) {
    elDoms.value.push(el)
    console.log(el)
  }
}

const moveToTarget = () => {
  nextTick(() => {
    for (const tag of elDoms.value) {
      if (tag.to.path === route.path) {
        useIntersectionObserver(
          tag,
          ([{ isIntersecting }]) => {
            console.log(isIntersecting)
            if (isIntersecting) return

            console.log()
            if (getTabsList.value[getTabsList.value.length - 1].path === tag.to.path) {
              scrollbar.value.setScrollLeft(useTransition(scrollWrapper.value.value))
              console.log(scrollWrapper.value.value)
            }
          },
          { threshold: 1 }
        )
        break
      }
    }
  })
}

watch(
  () => route.path,
  () => {
    tabStore.addTab(route)
    moveToTarget()
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.tabs-bar {
  display: inline-flex;
  background-color: #fff;
  box-shadow: 0 0 1px #ccc;
  z-index: 4;
  position: relative;
  :deep(.tabs) {
    height: $tabs-bar-height;
    align-items: center;
    padding: 0 15px;
    display: inline-flex;
    .box {
      &:not(:last-child) {
        margin-right: 5px;
      }
    }
  }

  .icons {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding-right: 4px;
    .icon {
      box-sizing: content-box;
      height: $tabs-bar-height;
      font-size: 18px;
      display: flex;
      padding: 0 6px;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s;
      color: var(--c-text-1);
      &:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }
    }
  }
}

.tab {
  padding: 0 6px 0 10px;
  border-radius: 4px;
  height: 24px;
  line-height: 24px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s, border-color 0.3s, color 0.3s;
  border: 1px solid #ccc;
  white-space: nowrap;

  &:hover {
    .el-icon {
      width: 18px;
    }
  }

  &--active {
    background-color: #538cff;
    color: #fff;
    border-color: #538cff;
    .el-icon {
      color: #fff;
    }
  }

  > span {
    margin-right: 4px;
  }
  .el-icon {
    border-radius: 50%;
    width: 0;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s, color 0.3s, width 0.3s;
    &:hover {
      background-color: #f56c6c;
      color: #fff;
    }
  }
}
</style>
