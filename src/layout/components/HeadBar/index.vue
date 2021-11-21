<template>
  <header class="headbar" :class="{ 'headbar--shadow': shadow }">
    <left-box />
    <right-box />
  </header>
</template>
<script setup>
import LeftBox from './components/LeftBox.vue'
import RightBox from './components/RightBox.vue'
defineProps({
  shadow: Boolean,
})
</script>
<style lang="scss" scoped>
.headbar {
  height: $headbar-height;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 1px #ccc;
  z-index: 1;
  position: fixed;
  left: 0;
  right: 0;
  transition: top 0.3s, margin-left 0.3s;
  &--shadow {
    box-shadow: 0 10px 10px -10px #c7c7c7;
  }
}
</style>
