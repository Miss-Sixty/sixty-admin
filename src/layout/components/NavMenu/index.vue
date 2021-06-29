<template>
  <el-menu class="el-menu" :collapse="isCollapse">
    <template v-for="route in router" :key="route.path">
      <nav-menu-item :item="route" :base-path="route.path" />
    </template>
  </el-menu>
</template>

<script>
import { ref } from "vue";
import NavMenuItem from "./components/NavMenuItem";
export default {
  components: { NavMenuItem },
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
.el-menu {
  border-right: 0;
}
</style>
