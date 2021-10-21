<template>
  <el-dropdown :trigger="isExtra ? 'click' : 'contextmenu'" @visible-change="handleContextMenu">
    <slot>
      <router-link class="tab" role="button" exact-active-class="tab--active" :to="tabItem">
        <span>{{ tabItem?.meta?.title }}</span>
        <el-icon role="button" v-if="!tabItem?.meta?.affix" @click.prevent.stop="closeTab">
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
import { computed } from 'vue'
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

const closeTab = () => tabStore.closeTab(route, router, props.tabItem)
const refreshPage = () => router.push({ name: 'Reload' })
const { closeLeft, closeRight, closeOther, closeAll } = tabStore.handleCloseTags(route, router, props.tabItem)
const handleContextMenu = bl => bl && tabStore.handleContextMenu(props.isExtra, props.tabItem)

const dropMenuList = computed(() => [
  {
    event: refreshPage,
    text: '重新加载',
  },
  {
    event: closeTab,
    text: '关闭当前标签',
    disabled: props.tabItem?.meta?.affix,
  },
  {
    event: closeLeft,
    text: '关闭到左侧',
    disabled: tabStore.disabledLeft,
    divided: true,
  },
  {
    event: closeRight,
    text: '关闭到右侧',
    disabled: tabStore.disabledRight,
  },
  {
    event: closeOther,
    text: '关闭其他标签',
    disabled: tabStore.disabledOther,
    divided: true,
  },
  {
    event: closeAll,
    text: '关闭全部标签',
    disabled: tabStore.disabledAll,
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
