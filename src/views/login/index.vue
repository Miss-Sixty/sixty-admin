<template>
  <div class="login">
    <component :is="typeComponent" v-model="loginType" class="form" />
  </div>
</template>
<script setup>
import BaseForm from './components/BaseForm.vue'
import { computed, ref } from 'vue'

const loginType = ref('base')
const typeComponent = computed(() => {
  const status = {
    base: BaseForm
  }
  return status[loginType.value]
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  overflow: hidden;
  max-width: 1400px;
  margin: auto;
  user-select: none;
  .form {
    width: 450px;
    padding: 50px;
    margin: 10% auto;
  }
}
</style>
