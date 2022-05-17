<script setup>
const resetToken = () => {
  localStorage.removeItem('token')
}
</script>

<template>
  home
  <router-link to="/login">to login</router-link>

  <el-button type="primary" size="default" @click="resetToken">清空token</el-button>
</template>
