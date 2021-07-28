<template>
  <el-row type="flex" justify="space-between" align="middle" class="headbar" :class="{ shadow: props.isScrollTop }">
    <left-box @collapseChange="val => $emit('collapseChange', val)" />
    <right-box />
  </el-row>
</template>
<script setup>
import LeftBox from './components/LeftBox'
import RightBox from './components/RightBox'
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
  isScrollTop: Boolean,
})

defineEmits(['collapseChange'])
</script>
<style lang="scss" scoped>
.headbar {
  height: $headbar-height;
  background-color: $navmenu-bg;
  transition: box-shadow 0.2s;
  box-shadow: 0 0 1px 0 #ccc;
  position: relative;
  z-index: 1000;
  font-size: 16px;
  flex-wrap: nowrap;
  &.shadow {
    box-shadow: 0 10px 10px -10px #ccc;
  }
}
</style>
