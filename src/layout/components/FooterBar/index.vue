<template>
  <footer class="footerbar">
    Copyright © {{ copyrightDates }}
    <a v-if="copyrightWebsite" target="_blank" :href="copyrightWebsite">
      {{ copyrightCompany }}
    </a>
    <span v-else>{{ copyrightCompany }}</span>
  </footer>
</template>

<script setup>
import { useSettingStore } from '@/store/modules/setting'
const { copyrightDates, copyrightCompany, copyrightWebsite } = useSettingStore()
</script>

<style lang="scss" scoped>
.footerbar {
  height: $footerbar-height;
  line-height: $footerbar-height;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
  border-top: 1px dashed #dcdfe6;
  font-size: 14px;

  a {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.45);
    transition: color 0.3s;
    &:hover {
      color: #3d4047;
    }
  }
}
</style>
