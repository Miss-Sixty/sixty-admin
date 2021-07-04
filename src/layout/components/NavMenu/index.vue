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
          <svg-icon v-if="item.meta?.icon" :name="item.meta?.icon" />
          <span>{{ item.meta?.title }}</span>
        </div>
      </template>
    </div>
    <div
      class="menu-follower"
      :class="{ 'menu-follower--isCollapse': isCollapse }"
    >
      <logo :isScrollTop="isScrollTop" />
      <el-scrollbar view-style="height:100%" @scroll="scrollChange">
        <el-menu
          class="menu-follower-content"
          :collapse="isCollapse"
          :collapse-transition="false"
          unique-opened
          :default-active="route.meta.activeMenu || route.path"
        >
          <transition-group name="sidebar">
            <template v-for="route in routerList" :key="route.path">
              <nav-menu-item
                :key="route.path"
                v-if="!route.meta.sidebar"
                :item="route"
                :base-path="route.path"
              />
            </template>
          </transition-group>
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
import { computed, ref } from "vue";
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

    const isScrollTop = ref(false);
    const scrollChange = (scroll) => {
      isScrollTop.value = scroll.scrollTop ? true : false;
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
      isScrollTop,
      scrollChange,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/var.scss";
@import "@/styles/mixins";

.menu {
  display: flex;
  position: relative;
  z-index: 2;
  // box-shadow: 0 0 1px 0 #ccc;

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
      transition: background-color 0.3s;
      &--active,
      &:hover {
        background-color: $g-main-sidebar-active-bg;
      }
      .svg-icon {
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
    transition: width 0.2s;

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

// 侧边栏动画
.sidebar-enter-active,
.sidebar-leave-active {
  transition: all 0.2s;
}
.sidebar-enter-from,
.sidebar-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.sidebar-leave-active {
  position: absolute;
}
</style>
