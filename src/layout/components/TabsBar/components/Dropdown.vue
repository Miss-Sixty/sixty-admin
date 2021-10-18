<template>
  <el-dropdown :trigger="isExtra ? 'click' : 'contextmenu'">
    <router-link
      class="tab"
      role="button"
      :class="{ 'tab--active': isActive(tabItem) }"
      :to="{ path: tabItem.path, query: tabItem.query, fullPath: tabItem.fullPath }"
      v-if="!isExtra"
    >
      <span>{{ tabItem?.meta?.title }}</span>
      <el-icon role="button" v-if="!tabItem?.meta?.affix" @click.prevent.stop="closeTag(tabItem)">
        <close />
      </el-icon>
    </router-link>

    <el-icon :size="18" role="button" v-else>
      <menu-icon />
    </el-icon>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item icon="el-icon-plus">重新加载</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus">关闭标签</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus-outline" divided>关闭到左侧</el-dropdown-item>
        <el-dropdown-item icon="el-icon-check">关闭到右侧</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-check" divided>关闭其他</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-check">关闭全部</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { defineProps } from 'vue'
import { Close, Menu as MenuIcon } from '@element-plus/icons'
import { useRouter, useRoute } from 'vue-router'
import { useMultipleTabStore } from '@/store/modules/multipleTab'

const router = useRouter()
const route = useRoute()
const tabStore = useMultipleTabStore()

defineProps({
  tabItem: Object,
  isExtra: Boolean,
})

const isActive = tag => tag.path === route.path
const closeTag = tab => tabStore.closeTab(tab, router)
</script>

<style lang="scss" scoped>
.box {
  &:not(:last-child) {
    margin-right: 10px;
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
}
</style>
