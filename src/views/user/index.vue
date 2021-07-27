<template>
  <div class="page-main">
    <el-row :gutter="32">
      <el-col :span="7">
        <vertical-menu v-model="state.type" :list="settingTitle" />
      </el-col>
      <el-col :span="17" class="setting">
        <el-card class="box-card">
          <transition-group name="setting">
            <component :is="state.type" :key="state.type" />
          </transition-group>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import settings from './components/BaseSetting'
import password from './components/PasswordSetting'
import { reactive } from 'vue'
export default {
  components: { settings, password },
  setup() {
    const settingTitle = [
      {
        icon: 'user-settings-line',
        title: '基本设置',
        type: 'settings',
      },
      {
        icon: 'lock-password-line',
        title: '更改密码',
        type: 'password',
      },
    ]

    const state = reactive({
      type: 'settings',
    })

    return {
      settingTitle,
      state,
    }
  },
}
</script>
<style lang="scss" scoped>
.page-main {
  background-color: inherit;
  padding: 0;
}

.setting-enter-active,
.setting-leave-active {
  transition: all 0.2s;
}
.setting-enter-from,
.setting-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.setting-leave-active {
  position: absolute;
}
</style>
