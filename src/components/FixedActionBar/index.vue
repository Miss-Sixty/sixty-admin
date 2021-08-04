<template>
  <el-affix position="bottom" @change="bl => (shadow = bl)">
    <div class="fixed-adtion-bar" :class="{ shadow }">
      <slot />
    </div>
  </el-affix>
</template>
<script>
export default {
  name: 'FixedActionBar',
}
</script>

<script setup>
import { ref } from 'vue'
const shadow = ref(false)
</script>
<style lang="scss" scoped>
.fixed-adtion-bar {
  padding: 20px;
  text-align: center;
  background-color: #fff;
  transition: box-shadow 0.2s;
}
.shadow {
  box-shadow: 0 -10px 10px -10px #ccc;
}
</style>
