<template>
  <router-link
    v-if="
      hasOneShowingChild(props.item.children, props.item) &&
      (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
      !props.item.alwaysShow
    "
    v-slot="{ href, navigate }"
    custom
    :to="resolvePath(onlyOneChild.path)"
  >
    <a
      :href="isExternal(resolvePath(onlyOneChild.path)) ? resolvePath(onlyOneChild.path) : href"
      :target="isExternal(resolvePath(onlyOneChild.path)) ? '_blank' : '_self'"
      @click="navigate"
    >
      <el-menu-item :title="onlyOneChild.meta.title" :index="resolvePath(onlyOneChild.path)">
        <el-icon v-if="onlyOneChild.meta.icon" class="icon">
          <component :is="onlyOneChild.meta.icon || props.item.meta?.icon" />
        </el-icon>
        <template #title>
          {{ onlyOneChild.meta.title }}
        </template>
      </el-menu-item>
    </a>
  </router-link>

  <el-submenu v-else :index="resolvePath(props.item.path)">
    <template #title>
      <el-icon v-if="props.item.meta?.icon" class="icon">
        <component :is="props.item.meta?.icon" />
      </el-icon>
      <span>{{ props.item.meta?.title }}</span>
    </template>

    <template v-for="route in props.item.children" :key="route.path">
      <nav-menu-item v-if="!props.item.hidden" :item="route" :base-path="resolvePath(route.path)" />
    </template>
  </el-submenu>
</template>

<script>
export default {
  name: 'NavMenuItem',
}
</script>

<script setup>
import path from 'path'
import { defineProps, ref } from 'vue'

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

let onlyOneChild = ref(null)

const hasOneShowingChild = (children = [], parent) => {
  const showingChildren = children.filter(item => {
    if (item.hidden) {
      return false
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item
      return true
    }
  })

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }

  return false
}

const isExternal = path => {
  return /^(https?:|mailto:|tel:)/.test(path)
}

const resolvePath = routePath => {
  if (isExternal(routePath)) return routePath
  if (isExternal(props.basePath)) return props.basePath
  return path.resolve(props.basePath, routePath)
}
</script>

<style lang="scss" scoped>
a {
  cursor: pointer;
  color: inherit;
}
// TODO:待element-plus 将导航icon更新为svg后删除
.icon {
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
  vertical-align: middle;
}
</style>
