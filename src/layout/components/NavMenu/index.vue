<template>
  <div class="menu">
    <logo />
    <el-scrollbar view-style="height:100%">
      <el-menu
        class="menu-content"
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
</template>

<script>
import Logo from "../Logo";
import NavMenuItem from "../NavMenuItem";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import variables from "@/styles/var.scss";

export default {
  components: { NavMenuItem, Logo },
  props: {
    isCollapse: Boolean,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const routerList = store.getters["menu/sidebarRoutes"];
    return {
      routerList,
      route,
      variables,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/var.scss";
.menu {
  display: flex;
  flex-direction: column;
  height: 100vh;

  &-content {
    border-right: none;
    height: 100%;
  }
}

//收起导航树选中的颜色
::v-deep .el-menu--collapse .el-submenu.is-active .el-submenu__title .icon {
  color: #409eff;
}
</style>
