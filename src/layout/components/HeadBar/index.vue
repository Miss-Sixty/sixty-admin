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
}
</style>
