<template>
  <router-link
    v-if="!hasChildren"
    v-slot="{ href, navigate }"
    custom
    :to="resolvePath(item.path)"
  >
    <a
      :href="isExternal(resolvePath(item.path)) ? resolvePath(item.path) : href"
      :target="isExternal(resolvePath(item.path)) ? '_blank' : '_self'"
      @click="navigate"
    >
      <el-menu-item :index="resolvePath(item.path)">
        <svg-icon v-if="item.meta?.icon" :name="item.meta?.icon" />
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </a>
  </router-link>

  <el-submenu v-else :index="resolvePath(item.path)">
    <template #title>
      <svg-icon v-if="item.meta?.icon" :name="item.meta?.icon" />
      <span>{{ item.meta.title }}</span>
    </template>

    <template v-for="route in item.children" :key="route.path">
      <SidebarItem
        v-if="!route.meta?.hidden"
        :item="route"
        :base-path="resolvePath(item.path)"
      />
    </template>
  </el-submenu>
</template>
<script>
import path from "path";
import { computed } from "vue";
export default {
  name: "SidebarItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    //判断它有无子项
    const hasChildren = computed(() => {
      let flag = true;
      if (props.item.children?.length) {
        if (props.item.children.every((item) => item.meta.hidden)) {
          flag = false;
        }
      } else {
        flag = false;
      }
      return flag;
    });

    const isExternal = (path) => {
      return /^(https?:|mailto:|tel:)/.test(path);
    };

    const resolvePath = (routePath) => {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(props.basePath)) {
        return props.basePath;
      }
      return path.resolve(props.basePath, routePath);
    };

    return {
      hasChildren,
      isExternal,
      resolvePath,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/var.scss";
@import "@/styles/mixins";

a {
  cursor: pointer;
  color: inherit;
  text-decoration: none;
}

::v-deep .el-menu-item,
::v-deep .el-menu-item span,
::v-deep .el-submenu__title,
::v-deep .el-submenu__title span {
  vertical-align: inherit;
  @include text-overflow;
}

::v-deep .el-menu-item,
::v-deep .el-submenu__title {
  display: flex;
  align-items: center;
  span {
    flex: 1;
  }
}
.svg-icon {
  margin-right: 6px;
  font-size: 16px;
}
</style>
