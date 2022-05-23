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
</script>

<template>
  <el-menu-item v-if="!hasChildren" :index="resolveRoutePath(basePath, item.path)">
    <el-icon v-if="item.meta?.icon"><component :is="item.meta?.icon" /></el-icon>
    {{ item.meta?.title }}
  </el-menu-item>

  <el-sub-menu v-else :index="resolveRoutePath(basePath, item.path)">
    <template #title>
      <el-icon v-if="item.meta?.icon"><component :is="item.meta?.icon" /></el-icon>
      <span>{{ item.meta?.title }}</span>
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

<style lang="scss" scoped></style>
