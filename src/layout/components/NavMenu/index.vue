<template>
  <div class="menu">
    <logo />
    <el-scrollbar view-style="height:100%">
      <el-menu
        class="menu-content"
        :collapse="isCollapse"
        unique-opened
        :default-active="route.meta.activeMenu || route.path"
        :background-color="variables.g_sub_sidebar_bg"
        :text-color="variables.g_sub_sidebar_menu_color"
        :active-text-color="variables.g_sub_sidebar_menu_active_color"
      >
        <template v-for="route in routerList" :key="route.path">
          <nav-menu-item
            :key="route.path"
            v-if="route.meta.sidebar !== false"
            :item="route"
            :base-path="route.path"
          />
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { ref } from "vue";
import Logo from "../Logo";
import NavMenuItem from "../NavMenuItem";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import variables from "@/styles/var.scss";

export default {
  components: { NavMenuItem, Logo },
  setup() {
    const isCollapse = ref(false);
    const store = useStore();
    const route = useRoute();
    const routerList = store.getters["menu/sidebarRoutes"];
    return {
      isCollapse,
      routerList,
      route,
      variables,
    };
  },
};
</script>
<style lang="scss" scoped>
.menu {
  display: flex;
  flex-direction: column;
  height: 100vh;

  &-content {
    border-right: none;
    height: 100%;
  }
}
</style>
