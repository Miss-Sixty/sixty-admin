<template>
  <div v-if="item.meta.sidebar !== false">
    <router-link
      v-if="!hasChildren"
      v-slot="{ href, navigate, isActive, isExactActive }"
      custom
      :to="resolvePath(item.path)"
    >
      <a
        :href="
          isExternal(resolvePath(item.path)) ? resolvePath(item.path) : href
        "
        :class="[
          isActive && 'router-link-active',
          isExactActive && 'router-link-exact-active',
        ]"
        :target="isExternal(resolvePath(item.path)) ? '_blank' : '_self'"
        @click="navigate"
      >
        <el-menu-item :title="item.meta.title" :index="resolvePath(item.path)">
          <i v-if="item.meta.icon" class="el-icon-platform-eleme icon" />
          <span>{{ item.meta.title }}</span>
        </el-menu-item>
      </a>
    </router-link>

    <el-submenu v-else :title="item.meta.title" :index="resolvePath(item.path)">
      <template #title>
        <i v-if="item.meta.icon" class="el-icon-platform-eleme icon" />
        <span>{{ item.meta.title }}</span>
      </template>
      <SidebarItem
        v-for="route in item.children"
        :key="route.path"
        :item="route"
        :base-path="resolvePath(item.path)"
      />
    </el-submenu>
  </div>
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
        if (props.item.children.every((item) => item.meta.sidebar === false)) {
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
}

::v-deep .el-submenu,
::v-deep .el-menu-item {
  .icon,
  span {
    transition: transform 0.25s ease;
  }
  .icon {
    font-size: 20px;
    margin-right: 10px;
    vertical-align: -0.25em;
  }

  &:hover > .icon,
  .el-submenu__title:hover > .icon {
    transform: translateX(5px);
  }

  &:hover > span,
  .el-submenu__title:hover > span {
    transform: translateX(5px);
  }
}

::v-deep .el-menu-item.is-active,
.el-submenu .el-menu--inline .el-menu-item.is-active {
  color: $g-sub-sidebar-menu-active-color !important;
  background-color: $g-sub-sidebar-menu-active-bg !important;
}
::v-deep .el-submenu__title:hover,
.el-menu-item:hover {
  background-color: $g-sub-sidebar-bg !important;
}
</style>
