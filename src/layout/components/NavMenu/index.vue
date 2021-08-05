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
          <el-icon v-if="item.meta?.icon" class="icon">
            <component :is="item.meta?.icon" />
          </el-icon>
          <span>{{ item.meta?.title }}</span>
        </div>
      </template>
    </div>

    <el-scrollbar view-style="height: 100vh;" @scroll="scroll => (isScrollTop = !!scroll.scrollTop)">
      <el-menu
        :collapse="isCollapse"
        unique-opened
        :default-active="route.meta.activeMenu || route.path"
        :text-color="variables.navmenu_color"
        :active-text-color="variables.navmenu_active_color"
      >
        <el-affix :z-index="1">
          <logo-name :is-scroll-top="isScrollTop" />
        </el-affix>
        <template v-for="item in routerList" :key="item.path">
          <nav-menu-item v-if="!item.meta.sidebar" :key="item.path" :item="item" :base-path="item.path" />
        </template>
      </el-menu>
    </el-scrollbar>
  </div>

  <!-- phone & pad -->
  <el-drawer
    v-else
    size="auto"
    :model-value="!isCollapse"
    direction="ltr"
    :show-close="false"
    :with-header="false"
    @close="closeChange"
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
            <el-icon v-if="item.meta?.icon" class="icon">
              <component :is="item.meta?.icon" />
            </el-icon>
            <span>{{ item.meta?.title }}</span>
          </div>
        </template>
      </div>
      <el-scrollbar view-style="height: 100vh;" @scroll="scroll => (isScrollTop = !!scroll.scrollTop)">
        <el-menu
          unique-opened
          :default-active="route.meta.activeMenu || route.path"
          :text-color="variables.navmenu_color"
          :active-text-color="variables.navmenu_active_color"
        >
          <el-affix :z-index="1">
            <logo-name :is-scroll-top="isScrollTop" />
          </el-affix>
          <template v-for="item in routerList" :key="item.path">
            <nav-menu-item v-if="!item.meta.sidebar" :key="item.path" :item="item" :base-path="item.path" />
          </template>
        </el-menu>
      </el-scrollbar>
    </div>
  </el-drawer>
</template>

<script setup>
import LogoName from '../Logo'
import NavMenuItem from '../NavMenuItem'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import variables from '@/styles/resources/var.scss'
const store = useStore()
const route = useRoute()
const isScrollTop = ref(false)
const isCollapse = computed(() => store.state.setting.sidebarCollapse)
const closeChange = () => store.commit('setting/TOOGLE_SIDEBAR_COLLAPSE')
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
      .icon {
        margin: 0 auto 2px;
        font-size: 18px;
      }
      span {
        text-align: center;
        @include text-overflow;
      }
    }
  }
}
:deep(.el-menu) {
  border: none;
  height: 100%;
  background-color: $navmenu-bg;
  &:not(.el-menu--collapse) {
    width: $navmenu-width;
  }
}
</style>
