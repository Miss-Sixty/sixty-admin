<template>
  <header class="headbar">
    <left-box />
    <right-box />
  </header>
</template>
<script setup>
import LeftBox from './components/LeftBox.vue'
import RightBox from './components/RightBox.vue'
</script>
<style lang="scss" scoped>
.headbar {
  height: $headbar-height;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 1px #ccc;
  z-index: 4;

  :deep(.header-icon) {
    box-sizing: content-box;
    height: $headbar-height;
    font-size: 18px;
    display: flex;
    padding: 0 10px;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
  }
}
</style>
