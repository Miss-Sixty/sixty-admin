<script>
export default {
  name: 'SidebarMenuItem',
}
</script>
<script setup>
import { isExternalLink } from '@/utils/verify'
import path from 'path-browserify'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  basePath: {
    type: String,
    default: '',
  },
})

const resolveRoutePath = (basePath, routePath) => {
  if (isExternalLink(routePath)) {
    return routePath
  }
  if (isExternalLink(basePath)) {
    return basePath
  }
  return basePath ? path.resolve(basePath, routePath) : routePath
}

const hasChildren = computed(() => {
  let flag = true
  if (props.item.children) {
    if (props.item.children.every((item) => item.meta.sidebar === false)) {
      flag = false
    }
  } else {
    flag = false
  }
  return flag
})

const badge = (badge) => {
  let res = {
    type: '', // text or dot
    value: '',
    visible: false,
  }
  if (badge) {
    res.visible = true
    res.value = typeof badge == 'function' ? badge() : badge
    if (typeof res.value == 'boolean') {
      res.type = 'dot'
      if (!res.value) {
        res.visible = false
      }
    } else if (typeof res.value == 'number') {
      res.type = 'text'
      if (res.value <= 0) {
        res.visible = false
      }
    } else {
      res.type = 'text'
      if (!res.value) {
        res.visible = false
      }
    }
  }
  return res
}
</script>

<template>
  <el-menu-item v-if="!hasChildren" :index="resolveRoutePath(basePath, item.path)">
    <template #title>
      <el-icon v-if="item.meta?.icon"><component :is="item.meta?.icon" /></el-icon>
      <span class="title">{{ item.meta?.title }}</span>
      <span
        v-if="badge(item.meta?.badge).visible"
        :class="{
          badge: true,
          'badge-dot': badge(item.meta?.badge).type === 'dot',
          'badge-text': badge(item.meta?.badge).type === 'text',
        }"
      >
        {{ badge(item.meta?.badge).type === 'text' ? badge(item.meta?.badge).value : '' }}
      </span>
    </template>
  </el-menu-item>

  <el-sub-menu v-else :index="resolveRoutePath(basePath, item.path)">
    <template #title>
      <el-icon v-if="item.meta?.icon"><component :is="item.meta?.icon" /></el-icon>
      <span class="title">{{ item.meta?.title }}</span>
      <span
        v-if="badge(item.meta?.badge).visible"
        style="margin-right: 20px"
        :class="{
          badge: true,
          'badge-dot': badge(item.meta?.badge).type === 'dot',
          'badge-text': badge(item.meta?.badge).type === 'text',
        }"
      >
        {{ badge(item.meta?.badge).type === 'text' ? badge(item.meta?.badge).value : '' }}
      </span>
    </template>

    <template v-for="route in item.children" :key="route.path">
      <SidebarMenuItem
        v-if="route.meta.sidebar !== false"
        :key="route.path"
        :item="route"
        :base-path="resolveRoutePath(basePath, item.path)"
      />
    </template>
  </el-sub-menu>
</template>
<style lang="scss" scoped>
.badge {
  background-color: #f56c6c;
  box-shadow: 0 0 0 1px #fff;
  &-dot {
    border-radius: 50%;
    width: 6px;
    height: 6px;
    position: relative;
    &::after {
      content: '';
      pointer-events: none;
      position: absolute;
      top: 0;
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      animation: dot-twinkling 1s infinite ease-in-out;
      background-color: #f56c6c;
    }
  }
  @keyframes dot-twinkling {
    0% {
      opacity: 0.6;
      transform: scale(0.8);
    }
    100% {
      opacity: 0;
      transform: scale(2.4);
    }
  }
  &-text {
    border-radius: 10px;
    font-size: 12px;
    height: 18px;
    line-height: 18px;
    padding: 0 6px;
    white-space: nowrap;
    color: #fff;
  }
}
:deep(.el-sub-menu__title),
:deep(.el-menu-item) {
  display: flex;
  align-items: center;

  .title {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &.sub {
      padding-right: 20px;
    }
  }
}
</style>
