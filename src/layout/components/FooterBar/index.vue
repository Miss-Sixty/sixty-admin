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
export default {
  setup() {
    const copyrightDates = setting.copyrightDates;
    const copyrightCompany = setting.copyrightCompany;
    const copyrightWebsite = setting.copyrightWebsite;
    return { copyrightDates, copyrightCompany, copyrightWebsite };
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/var.scss";
.footerbar {
  height: $footerbar-height;
  background-color: blueviolet;
  line-height: $footerbar-height;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
  border-top: 1px dashed #dcdfe6;
  font-size: 14px;
  a {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.45);
    &:hover {
      color: #3d4047;
    }
  }
}
</style>
