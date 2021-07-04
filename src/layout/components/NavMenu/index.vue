<template>
  <div class="menu">
    <div
      v-if="mainRoutes.length > 1 || alwaysShowMainSidebar"
      class="menu-main"
    >
      <template v-for="(item, index) in mainRoutes">
        <div
          v-if="item.children?.length"
          :key="index"
          class="menu-main__item"
          :class="{ 'menu-main__item--active': index === headerActived }"
          @click="switchActivedChange(index)"
        >
          <i v-if="item.meta?.icon" :class="item.meta?.icon" />
          <span>{{ item.meta?.title }}</span>
        </div>
      </template>
    </div>
    <div
      class="menu-follower"
      :class="{ 'menu-follower--isCollapse': isCollapse }"
    >
      <logo />
      <el-scrollbar view-style="height:100%">
        <el-menu
          class="menu-follower-content"
          :collapse="isCollapse"
          :collapse-transition="false"
          unique-opened
          :default-active="route.meta.activeMenu || route.path"
        >
          <template v-for="route in routerList" :key="route.path">
            <nav-menu-item
              :key="route.path"
              v-if="!route.meta.sidebar"
              :item="route"
              :base-path="route.path"
            />
          </template>
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import Logo from "../Logo";
import NavMenuItem from "../NavMenuItem";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import variables from "@/styles/var.scss";
import { computed } from "vue";
export default {
  components: { NavMenuItem, Logo },
  props: {
    isCollapse: Boolean,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const switchActivedChange = (index) => {
      store.commit("menu/SWITCHACTIVED", index);
    };
    return {
      routerList: computed(() => store.getters["menu/sidebarRoutes"]),
      route,
      variables,
      mainRoutes: computed(() => store.state.menu.routes),
      alwaysShowMainSidebar: computed(
        () => store.state.setting.alwaysShowMainSidebar
      ),
      headerActived: computed(() => store.state.menu.headerActived),
      switchActivedChange,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/var.scss";
@import "@/styles/mixins";

.menu {
  display: flex;

  &-main {
    background-color: $g-main-sidebar-bg;
    color: #fff;
    &__item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: $g-main-sidebar-width;
      width: $g-main-sidebar-width;
      padding: 0 5px;
      cursor: pointer;
      transition: 0.3s;
      &--active,
      &:hover {
        background-color: $g-main-sidebar-active-bg;
      }
      i {
        margin: 0 auto;
        font-size: 20px;
      }
      span {
        text-align: center;
        font-size: 14px;
        @include text-overflow;
      }
    }
  }
  &-follower {
    display: flex;
    flex-direction: column;
    width: $navmenu-width;
    height: 100vh;
    transition: 0.2s;

    &--isCollapse {
      width: $navmenu-collapse-width;
    }
    &-content {
      border-right: none;
      height: 100%;
      background-color: $g_sub_sidebar_bg;
    }
  }
}

//收起导航树选中的颜色
::v-deep .el-menu--collapse .el-submenu.is-active .el-submenu__title .icon {
  color: #409eff;
}
</style>
