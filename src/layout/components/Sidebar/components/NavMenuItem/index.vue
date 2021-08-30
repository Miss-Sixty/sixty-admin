<template>
  <!-- <router-link v-if="hasOneShowingChild(item.children, item)" v-slot="{ href, navigate }" custom :to="resolvePath(props.item.path)">
    <a
      :href="isExternal(resolvePath(props.item.path)) ? resolvePath(props.item.path) : href"
      :target="isExternal(resolvePath(props.item.path)) ? '_blank' : '_self'"
      @click="navigate"
    >
      <el-menu-item :index="resolvePath(props.item.path)">
        <el-icon v-if="props.item.children?.length === 1 ? props.item.children[0].meta?.icon : props.item.meta?.icon" class="icon">
          <component :is="props.item.children?.length === 1 ? props.item.children[0].meta?.icon : props.item.meta?.icon" />
        </el-icon>
        <template #title>
          {{ props.item.children?.length === 1 ? props.item.children[0].meta?.title : props.item.meta?.title }}
        </template>
      </el-menu-item>
    </a>
  </router-link> -->

  <!-- <template v-if="item.children?.length === 1">
    <app-link :to="resolvePath(item.children[0].path)">
      <el-menu-item :index="resolvePath(item.children[0].path)">
        <el-icon v-if="item.children[0].meta.icon" class="icon">
          <component :is="item.children[0].meta.icon || item.meta?.icon" />
        </el-icon>
        <template #title>
          {{ item.children[0].meta.title }}
        </template>
      </el-menu-item>
    </app-link> -->

  <router-link v-if="item.children?.length === 1" v-slot="{ href, navigate }" custom :to="resolvePath(item.children[0].path)">
    <a
      :href="isExternal(resolvePath(item.children[0].path)) ? resolvePath(item.children[0].path) : href"
      :target="isExternal(resolvePath(item.children[0].path)) ? '_blank' : '_self'"
      @click="navigate"
    >
      <el-menu-item :index="resolvePath(item.children[0].path)">
        <el-icon v-if="item.children[0].meta.icon" class="icon">
          <component :is="item.children[0].meta.icon || item.meta?.icon" />
        </el-icon>
        <template #title>
          {{ item.children[0].meta.title }}
        </template>
      </el-menu-item>
    </a>
  </router-link>

  <router-link v-else-if="!item.children?.length" v-slot="{ href, navigate }" custom :to="resolvePath(item.path)">
    <a
      :href="isExternal(resolvePath(item.path)) ? resolvePath(item.path) : href"
      :target="isExternal(resolvePath(item.path)) ? '_blank' : '_self'"
      @click="navigate"
    >
      <app-link :to="resolvePath(item.path)">
        <el-menu-item :index="resolvePath(item.path)">
          <el-icon v-if="item.meta.icon" class="icon">
            <component :is="item.meta.icon" />
          </el-icon>
          <template #title>
            {{ item.meta.title }}
          </template>
        </el-menu-item>
      </app-link>
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
      <nav-menu-item v-if="!item.hidden" :item="route" :base-path="resolvePath(props.item.path)" />
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
import { defineProps } from 'vue'
import AppLink from '../Link.vue'

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
