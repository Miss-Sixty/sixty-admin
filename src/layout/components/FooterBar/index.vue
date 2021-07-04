<template>
  <footer class="footerbar">
    Copyright © {{ copyrightDates }}
    <a v-if="copyrightWebsite" target="_blank" :href="copyrightWebsite">
      {{ copyrightCompany }}
    </a>
    <span v-else>{{ copyrightCompany }}</span>
  </footer>
</template>
<script>
import setting from "@/setting";
// import { onBeforeRouteUpdate, useRoute } from "vue-router";
// import { ref, onBeforeMount } from "vue";
export default {
  setup() {
    const copyrightDates = setting.copyrightDates;
    const copyrightCompany = setting.copyrightCompany;
    const copyrightWebsite = setting.copyrightWebsite;
    // const route = useRoute();
    // let copyright = ref(true);

    // const updateCopyright = (meta) => {
    //   if (meta.copyright === false) copyright.value = false;
    //   else copyright.value = true;
    // };

    // onBeforeRouteUpdate((to) => {
    //   updateCopyright(to.meta);
    // });

    // onBeforeMount(() => {
    //   updateCopyright(route.meta);
    // });

    return {
      copyrightDates,
      copyrightCompany,
      copyrightWebsite,
      // copyright,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/var.scss";
.footerbar {
  height: $footerbar-height;
  line-height: $footerbar-height;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
  border-top: 1px dashed #dcdfe6;
  font-size: 14px;
  background: $appmain-bg;

  a {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.45);
    &:hover {
      color: #3d4047;
    }
  }
}
</style>
