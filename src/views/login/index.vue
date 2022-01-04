<template>
  <div class="login">
    <div class="content">
  <header class="header">
      <h2 class="logo">{{ title }}</h2>
      <dark-switch />
    </header>

    <div class="box">
    <img class="svg" src="../../components/Icons/undraw_snowman_re_guxt.svg">
    <component :is="typeComponent" v-model="loginType" class="form" />
    </div>

    </div>

  </div>
</template>
<script setup>
import DarkSwitch from '@/layout/components/DarkSwitch/index.vue'
import BaseForm from './components/BaseForm/index.vue'
import MobileForm from './components/MobileForm/index.vue'
import ResetForm from './components/ResetForm/index.vue'
import QrCodeForm from './components/QrCodeForm/index.vue'
import RegisterForm from './components/RegisterForm/index.vue'
import { computed, ref } from 'vue'
import { useSettingStore } from '@/store/modules/setting'
const settingStore = useSettingStore()
const title = computed(() => settingStore.title)
const loginType = ref('base')
const typeComponent = computed(() => {
  const status = {
    base: BaseForm,
    mobile: MobileForm,
    qrCode: QrCodeForm,
    register: RegisterForm,
    reset: ResetForm,
  }
  return status[loginType.value]
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;

  .content{
  max-width: 1400px;
  margin: auto;
  user-select: none;
    height: 100%;
  }


  &::before{
    content: ' ';
    position: absolute;
    right: 50%;
    bottom: -35%;
    width:150vw;
    height:150vw;
    border-radius: 50%;
    background-color: #4C7CC3;
    z-index: -1;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 0 15px;
    .logo {
      flex: 1;
      font-weight: bold;
      margin: 0;
      color:#fff;
      font: 700 200% Consolas;
    }
  }

  .box{
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    padding-bottom: 100px;
    .svg{
      width:400px;
    }
  }

  .form {
    width: 450px;
    padding: 50px;
  }
}
</style>
