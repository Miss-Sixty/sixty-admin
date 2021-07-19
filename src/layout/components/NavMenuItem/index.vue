<template>
  <div>
    <router-link v-if="!hasChildren" v-slot="{ href, navigate }" custom :to="resolvePath(props.item.path)">
      <a
        :href="isExternal(resolvePath(props.item.path)) ? resolvePath(props.item.path) : href"
        :target="isExternal(resolvePath(props.item.path)) ? '_blank' : '_self'"
        @click="navigate"
      >
        <el-menu-item :index="resolvePath(props.item.path)">
          <svg-icon v-if="props.item.meta?.icon" :name="props.item.meta?.icon" />
          <span class="title">{{ props.item.meta?.title }}</span>
        </el-menu-item>
      </a>
    </router-link>

    <el-submenu v-else :index="resolvePath(props.item.path)">
      <template #title>
        <svg-icon v-if="item.meta?.icon" :name="props.item.meta?.icon" />
        <span class="title">{{ props.item.meta?.title }}</span>
      </template>

      <template v-for="route in props.item.children" :key="route.path">
        <sidebar-item v-if="!route.meta?.hidden" :item="route" :base-path="resolvePath(props.item.path)" />
      </template>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
}
</script>

<script setup>
import path from 'path'
import { computed, defineProps } from 'vue'

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

//判断它有无子项
const hasChildren = computed(() => {
  let flag = true
  if (props.item.children?.length) {
    if (props.item.children.every(item => item.meta.hidden)) {
      flag = false
    }
  } else {
    flag = false
  }
  return flag
})

const isExternal = path => {
  return /^(https?:|mailto:|tel:)/.test(path)
}

const resolvePath = routePath => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return path.resolve(props.basePath, routePath)
}
</script>

<style lang="scss" scoped>
a {
  cursor: pointer;
  color: inherit;
  text-decoration: none;
}

.title {
  margin-left: 6px;
  vertical-align: inherit;
  flex: 1;
  @include text-overflow;
}

:deep(.el-menu-item),
:deep(.el-submenu__title) {
  display: flex;
  align-items: center;
  justify-content: center;
}
.svg-icon {
  font-size: 16px;
}
</style>
