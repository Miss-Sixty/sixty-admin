<template>
  <div v-if="mode === 'pc'" class="menu">
    <div v-if="mainRoutes.length > 1 || alwaysShowMainSidebar" class="menu-main">
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
    <div class="menu-follower" :class="{ 'menu-follower--isCollapse': isCollapse }">
      <logo-name :is-scroll-top="isScrollTop" />
      <el-scrollbar @scroll="scroll => (isScrollTop = !!scroll.scrollTop)">
        <el-menu
          class="menu-follower-content"
          :collapse="isCollapse"
          unique-opened
          :default-active="route.meta.activeMenu || route.path"
          :collapse-transition="false"
        >
          <transition-group name="sidebar">
            <template v-for="item in routerList" :key="item.path">
              <nav-menu-item v-if="!item.meta.sidebar" :key="item.path" :item="item" :base-path="item.path" />
            </template>
          </transition-group>
        </el-menu>
      </el-scrollbar>
    </div>
  </div>

  <!-- phone & pad -->
  <el-drawer
    v-else
    size="auto"
    :model-value="!isCollapse"
    direction="ltr"
    :show-close="false"
    :with-header="false"
    @closed="closedChange"
  >
    <div class="menu">
      <div v-if="mainRoutes.length > 1 || alwaysShowMainSidebar" class="menu-main">
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
      <div>
        <logo-name :is-scroll-top="isScrollTop" />
        <el-scrollbar @scroll="scroll => (isScrollTop = !!scroll.scrollTop)">
          <el-menu
            class="menu-follower-content"
            unique-opened
            :default-active="route.meta.activeMenu || route.path"
            :collapse-transition="false"
          >
            <transition-group name="sidebar">
              <template v-for="item in routerList" :key="item.path">
                <nav-menu-item v-if="!item.meta.sidebar" :key="item.path" :item="item" :base-path="item.path" />
              </template>
            </transition-group>
          </el-menu>
        </el-scrollbar>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import LogoName from '../Logo'
import NavMenuItem from '../NavMenuItem'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'

const store = useStore()
const route = useRoute()
const isScrollTop = ref(false)
const isCollapse = computed(() => store.state.setting.sidebarCollapse)
const closedChange = () => {
  store.commit('setting/TOOGLE_SIDEBAR_COLLAPSE')
}
const mode = computed(() => store.state.setting.mode)

const alwaysShowMainSidebar = computed(() => store.state.setting.alwaysShowMainSidebar)
const switchActivedChange = index => store.commit('menu/SWITCHACTIVED', index)
const headerActived = computed(() => store.state.menu.headerActived)

const mainRoutes = computed(() => store.state.menu.routes)
const routerList = computed(() => store.getters['menu/sidebarRoutes'])
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  position: relative;
  z-index: 1001;
  box-shadow: $sidebar-box-shadow;
  height: 100%;
  &-main {
    background-color: $g-main-sidebar-bg;
    color: #fff;
    &__item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: $g-main-sidebar-width;
      width: $g-main-sidebar-width;
      margin: 5px;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
      &--active,
      &:hover {
        background-color: $g-main-sidebar-active-bg;
      }
      .svg-icon {
        margin: 0 auto;
        font-size: 18px;
      }
      span {
        text-align: center;
        @include text-overflow;
      }
    }
  }
  &-follower {
    display: flex;
    flex-direction: column;
    width: $navmenu-width;
    height: 100vh;
    transition: width 0.2s; //TODO：侧边栏展开收起动画和menu组件收起动画不一致
    background-color: $g-sub-sidebar-bg;
    &--isCollapse {
      width: $navmenu-collapse-width;
    }
    &-content {
      border-right: none;
      background-color: $g_sub_sidebar_bg;
    }
  }
}

//收起导航树选中的颜色
:deep(.el-menu--collapse) {
  .el-submenu.is-active .el-submenu__title .svg-icon {
    color: #409eff;
  }
  span {
    display: none;
  }
  i {
    right: 7px;
    margin-top: -5px;
  }
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
