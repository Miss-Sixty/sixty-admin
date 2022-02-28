<template>
  <div class="login">
    <div class="content">
      <header class="header">
        <div class="header__bar">
          <dark-switch />
        </div>
        <h1 class="logo">{{ title }}</h1>
      </header>

      <div class="box">
        <UndrawMobileUserReXta4 class="svg"/>
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
  overflow: hidden;
  position: relative;

  .content {
    max-width: 1400px;
    margin: auto;
    user-select: none;
    height: 100%;
  }

  .header {
    &__bar {
      display: flex;
      justify-content: end;
      padding: 15px;
    }
    .logo {
      margin: 0;
      font-weight: bold;
      color: #213547;
      padding: 0 15px;
    }
  }

  .box {
    margin-top: 8%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .svg {
      width: 400px;
    }
  }

  .form {
    width: 450px;
    padding: 50px;
  }
}
</style>
