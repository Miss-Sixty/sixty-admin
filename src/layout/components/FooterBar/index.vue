<template>
  <footer v-if="showCopyright" class="footerbar">
    Copyright © {{ copyrightDates }}
    <a v-if="copyrightWebsite" target="_blank" :href="copyrightWebsite">
      {{ copyrightCompany }}
    </a>
    <span v-else>{{ copyrightCompany }}</span>
  </footer>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { watch, ref } from 'vue'

const route = useRoute()
const sotre = useStore()
const copyrightDates = sotre.state.setting.copyrightDates
const copyrightCompany = sotre.state.setting.copyrightCompany
const copyrightWebsite = sotre.state.setting.copyrightWebsite
const showCopyright = ref(route.meta?.copyright === false ? false : sotre.state.setting.showCopyright)

watch(
  () => route.meta?.copyright,
  copyright => (showCopyright.value = copyright === false ? false : sotre.state.setting.showCopyright)
)
</script>

<style lang="scss" scoped>
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
    transition: color 0.3s;
    &:hover {
      color: #3d4047;
    }
  }
}
</style>
