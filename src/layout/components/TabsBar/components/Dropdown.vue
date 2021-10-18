<template>
  <el-dropdown :trigger="isExtra ? 'click' : 'contextmenu'" @visible-change="handleContextMenu">
    <slot>
      <router-link
        class="tab"
        role="button"
        :class="{ 'tab--active': isActive(tabItem) }"
        :to="{ path: tabItem.path, query: tabItem.query, fullPath: tabItem.fullPath }"
      >
        <span>{{ tabItem?.meta?.title }}</span>
        <el-icon role="button" v-if="!tabItem?.meta?.affix" @click.prevent.stop="closeTag">
          <close />
        </el-icon>
      </router-link>
    </slot>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(item, i) in dropMenuList"
          :key="i"
          :disabled="item.disabled"
          @click="item.event"
          :divided="item.divided"
        >
          {{ item.text }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { defineProps, reactive, computed } from 'vue'
import { Close } from '@element-plus/icons'
import { useRouter, useRoute } from 'vue-router'
import { useMultipleTabStore } from '@/store/modules/multipleTab'

const router = useRouter()
const route = useRoute()
const tabStore = useMultipleTabStore()

const props = defineProps({
  tabItem: Object,
  isExtra: Boolean,
})

const isActive = tag => tag.path === route.path
const closeTag = () => tabStore.closeTab(props.tabItem, router)
const refreshPage = () => router.push({ name: 'Reload' })
const closeLeft = () => tabStore.closeLeftTab(route)
const closeRight = () => tabStore.closeRightTabs(route)
const closeOther = () => tabStore.closeOtherTabs(route)
const closeAll = () => tabStore.closeAllTab(router)

const state = reactive({
  disabledLeft: false,
  disabledRight: false,
  disabledOther: false,
  disabledAll: false,
})
const handleContextMenu = bl => {
  if (!bl) return
  const index = tabStore.tabList.findIndex(tab => tab.path === props.tabItem.path)

  disabledTabs(0, index, 'disabledLeft')
  disabledTabs(index + 1, tabStore.tabList.length, 'disabledRight')
  disabledOtherOrAllTabs(index, 'disabledOther')
  disabledOtherOrAllTabs(null, 'disabledAll')
}

function disabledTabs(startIndex, endIndex, stateField) {
  const tabs = tabStore.tabList.slice(startIndex, endIndex)
  const pathList = []
  for (const item of tabs) {
    const affix = item?.meta?.affix ?? false
    !affix && pathList.push(item)
  }
  state[stateField] = !pathList.length
}

function disabledOtherOrAllTabs(index, stateField) {
  const pathList = []
  for (let i = 0; i < tabStore.tabList.length; i++) {
    if (index && i === index) continue
    const affix = tabStore.tabList[i]?.meta?.affix ?? false
    !affix && pathList.push(tabStore.tabList[i])
  }
  state[stateField] = !pathList.length
}

const dropMenuList = computed(() => [
  {
    event: refreshPage,
    text: '重新加载',
    disabled: null,
  },
  {
    event: closeTag,
    text: '关闭当前标签',
    disabled: props.tabItem?.meta?.affix,
  },
  {
    event: closeLeft,
    text: '关闭到左侧',
    disabled: state.disabledLeft,
    divided: true,
  },
  {
    event: closeRight,
    text: '关闭到右侧',
    disabled: state.disabledRight,
  },
  {
    event: closeOther,
    text: '关闭其他标签',
    disabled: state.disabledOther,
    divided: true,
  },
  {
    event: closeAll,
    text: '关闭全部标签',
    disabled: state.disabledAll,
  },
])
</script>

<style lang="scss" scoped>
.tab {
  padding: 0 6px 0 10px;
  border-radius: 4px;
  height: 24px;
  line-height: 24px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s, border-color 0.3s, color 0.3s;
  border: 1px solid #ccc;

  &:hover {
    .el-icon {
      width: 18px;
    }
  }

  &--active {
    background-color: #538cff;
    color: #fff;
    border-color: #538cff;
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
