<script>
export default {
  name: 'SidebarMenuItem',
}
</script>
<script setup>
import { isExternalLink } from '@/utils/verify'
import path from 'path-browserify'

defineProps({
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
</script>

<template>
  <el-sub-menu v-if="item.children?.length" :index="resolveRoutePath(basePath, item.path)">
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

  <el-menu-item v-else :index="resolveRoutePath(basePath, item.path)">{{ item.meta?.title }}</el-menu-item>
</template>

<style lang="scss" scoped></style>
