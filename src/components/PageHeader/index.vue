<template>
  <div class="header">
    <el-row align="middle">
      <el-row v-if="icon !== 'none' && iconText !== 'none'" align="middle" class="header__left" @click="backChange">
        <i v-if="icon !== 'none'" class="el-icon-back icon" />
        <p v-if="iconText !== 'none'" class="icon-text">{{ iconText }}</p>
      </el-row>
      <p class="title">{{ title }}</p>
    </el-row>

    <div class="header__content">
      <slot>
        <p>{{ content }}</p>
      </slot>
    </div>
  </div>
</template>

<script>
import { toRouter } from '@/hooks'

export default {
  name: 'PageHeader',
  props: {
    icon: {
      type: String,
      default: 'list-unordered',
    },
    iconText: {
      type: String,
      default: '返回',
    },

    title: String,
    backName: String,
    content: String,
  },
  emits: ['back'],
  setup(props, { emit }) {
    return {
      toRouter,
      backChange: () => {
        if (props.backName) return toRouter(props.backName)
        emit('back')
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.header {
  padding: 26px 20px;
  background: #fff;
  line-height: 24px;
  &__left {
    cursor: pointer;
    margin-right: 40px;
    position: relative;
    .icon {
      font-size: 18px;
      margin-right: 6px;
    }
    .icon-text {
      font-weight: 500;
      margin: 0;
    }
    &::after {
      content: '';
      position: absolute;
      width: 1px;
      height: 16px;
      right: -20px;
      top: 50%;
      transform: translateY(-50%);
      background-color: #dcdfe6;
    }
  }
  .title {
    font-size: 18px;
    color: #303133;
    margin: 0;
  }
  &__content {
    margin: 10px 0 0;
    color: #909399;
    font-size: 14px;
    p {
      margin: 0;
    }
  }
}
</style>
