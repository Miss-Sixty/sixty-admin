<template>
  <div class="page-main">
    <el-row :gutter="32">
      <el-col :span="8">
        <ul class="left-tab">
          <li
            v-for="(item, index) in settingTitle"
            :key="index"
            class="left-tab__item"
            :class="{ 'left-tab__item--active': index === state.activeIndex }"
            @click="state.activeIndex = index"
          >
            <svg-icon :name="item.icon" />
            {{ item.title }}
          </li>
        </ul>
      </el-col>
      <el-col :span="16" class="setting">
        <el-card class="box-card">
          <transition-group name="setting">
            <base-setting v-show="state.activeIndex === 0" :key="0" />
            <password-setting v-show="state.activeIndex === 1" :key="1" />
          </transition-group>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BaseSetting from './components/BaseSetting'
import PasswordSetting from './components/PasswordSetting'
import { reactive } from 'vue'
export default {
  components: { BaseSetting, PasswordSetting },
  setup() {
    const settingTitle = [
      {
        icon: 'user-settings-fill',
        title: '基本设置',
      },
      {
        icon: 'user-settings-fill',
        title: '更改密码',
      },
    ]

    const state = reactive({
      activeIndex: 0,
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
  color: #5e5873;
  background-color: inherit;
}
.left-tab {
  &__item {
    padding: 12px 16px;
    border-radius: 4px;

    font-size: 14px;
    cursor: pointer;
    margin-bottom: 5px;
    transition-property: background-color, box-shadow, color;
    transition-duration: 0.3s;
    &:hover {
      background-color: #409eff;
      box-shadow: 0 4px 18px -4px #56a6f7;
      color: #fff;
    }
    &--active {
      background-color: #409eff;
      box-shadow: 0 4px 18px -4px #56a6f7;
      color: #fff;
    }
  }
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
