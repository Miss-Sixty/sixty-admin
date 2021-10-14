<template>
  <router-link
    v-if="
      hasOneShowingChild(props.item.children, props.item) &&
      !props.item.alwaysShow
    "
    v-slot="{ href, navigate }"
    custom
    :to="resolvePath(onlyOneChild.path)"
  >
    <a
      :href="
        isExternal(resolvePath(onlyOneChild.path))
          ? resolvePath(onlyOneChild.path)
          : href
      "
      :target="isExternal(resolvePath(onlyOneChild.path)) ? '_blank' : '_self'"
      @click="navigate"
    >
      <el-menu-item
        :title="onlyOneChild.meta?.title"
        :index="resolvePath(onlyOneChild.path)"
      >
        <el-icon v-if="onlyOneChild.meta?.icon" class="icon">
          <component :is="onlyOneChild.meta?.icon || props.item.meta?.icon" />
        </el-icon>
        <template #title>
          <span class="title">{{ onlyOneChild.meta?.title }}</span>
          <span
            v-if="badge(onlyOneChild.meta?.badge).visible"
            :class="{
              badge: true,
              'badge-dot': badge(onlyOneChild.meta?.badge).type === 'dot',
              'badge-text': badge(onlyOneChild.meta?.badge).type === 'text',
            }"
          >
            {{
              badge(onlyOneChild.meta?.badge).type === "text"
                ? badge(onlyOneChild.meta?.badge).value
                : ""
            }}
          </span>
        </template>
      </el-menu-item>
    </a>
  </router-link>

  <el-sub-menu v-else :index="resolvePath(props.item.path)">
    <template #title>
      <el-icon v-if="props.item.meta?.icon" class="icon">
        <component :is="props.item.meta?.icon" />
      </el-icon>
      <span class="title">{{ props.item.meta?.title }}</span>
      <span
        v-if="badge(props.item.meta?.badge).visible"
        :class="{
          badge: true,
          'badge-dot': badge(props.item.meta.badge).type === 'dot',
          'badge-text': badge(props.item.meta.badge).type === 'text',
        }"
      >
        {{
          badge(props.item.meta.badge).type === "text"
            ? badge(props.item.meta.badge).value
            : ""
        }}
      </span>
    </template>

    <nav-menu-item
      v-for="route in props.item.children"
      :key="route.path"
      :item="route"
      :base-path="resolvePath(route.path)"
    />
  </el-sub-menu>
</template>

<script>
export default {
  name: "NavMenuItem",
};
</script>

<script setup>
import path from "path-browserify";
import { defineProps, shallowRef } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  basePath: {
    type: String,
    default: "",
  },
});

let onlyOneChild = shallowRef(null);

const hasOneShowingChild = (children = [], parent) => {
  if (children.length === 1) return (onlyOneChild.value = children[0]);
  if (!children.length) return (onlyOneChild.value = { ...parent, path: "" });
  return false;
};

const isExternal = (path) => {
  return /^(https?:|mailto:|tel:)/.test(path);
};

const resolvePath = (routePath) => {
  if (isExternal(routePath)) return routePath;
  if (isExternal(props.basePath)) return props.basePath;

  return props.basePath ? path.resolve(props.basePath, routePath) : routePath;
};

const badge = (badge) => {
  let res = {
    type: "", // text or dot
    value: "",
    visible: false,
  };
  if (badge) {
    res.visible = true;
    res.value = typeof badge == "function" ? badge() : badge;
    if (typeof res.value == "boolean") {
      res.type = "dot";
      if (!res.value) {
        res.visible = false;
      }
    } else if (typeof res.value == "number") {
      res.type = "text";
      if (res.value <= 0) {
        res.visible = false;
      }
    } else {
      res.type = "text";
      if (!res.value) {
        res.visible = false;
      }
    }
  }
  return res;
};
</script>

<style lang="scss" scoped>
// TODO:待element-plus 将导航icon更新为svg后删除
.icon {
  margin-right: 5px;
  text-align: center;
  font-size: 18px;
}

.badge {
  background-color: #f56c6c;
  box-shadow: 0 0 0 1px #fff;
  &-dot {
    border-radius: 50%;
    width: 6px;
    height: 6px;
    position: relative;
    &::after {
      content: "";
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

  * {
    vertical-align: baseline;
  }
  .title {
    flex: 1;
  }
  .el-sub-menu__icon-arrow.el-icon-arrow-down {
    margin-left: 4px;
    position: static;
    margin-top: 0;
  }
}
</style>
