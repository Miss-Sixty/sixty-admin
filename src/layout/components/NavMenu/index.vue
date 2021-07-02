<template>
  <div class="menu">
    <logo />
    <el-scrollbar class="scrollbar">
      <el-menu class="menu-content" :collapse="isCollapse">
        <template v-for="route in router" :key="route.path">
          <nav-menu-item :item="route" :base-path="route.path" />
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { ref } from "vue";
import Logo from "../Logo";
import NavMenuItem from "../NavMenuItem";

export default {
  components: { NavMenuItem, Logo },
  setup() {
    const isCollapse = ref(false);
    const router = ref([
      {
        name: "aaa",
        path: "/aaa",
      },
    ]);

    return {
      isCollapse,
      router,
    };
  },
};
</script>
<style lang="scss" scoped>
.menu {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .scrollbar {
    flex: 1;
    overflow: scroll;
  }

  &-content {
    // border-right: 0;
  }
}
</style>
