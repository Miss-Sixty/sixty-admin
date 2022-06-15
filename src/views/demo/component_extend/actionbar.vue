<script setup>
import FixedActionBar from '@/components/FixedActionBar.vue'
const arr = ref([1])
</script>

<template>
  <div>
    {{ arr }}
    <div>
      <p v-for="item in arr" :key="item" style="padding: 300px 0">{{ item }}</p>
      <FixedActionBar>
        <el-button size="large">取消</el-button>
        <el-button type="primary" size="large" @click="arr.push(arr.length)">立即创建</el-button>
      </FixedActionBar>
    </div>
  </div>
</template>

<style scoped>
.example-icon {
  font-size: 48px;
}
</style>
