<template>
  <div class="header">
    <el-row justify="space-between" class="header-heading">
      <div class="header-heading-left">
        <div v-if="!icon || !iconText || !noIcon" role="button" class="back" @click="$emit('click')" :class="{ 'left-after': title }">
          <component v-if="icon" :is="icon" class="icon" />
          <p v-if="iconText" class="icon-text">{{ iconText }}</p>
        </div>
        <p v-if="title" class="title">{{ title }}</p>
      </div>
      <slot name="extra" />
    </el-row>

    <div v-if="content || $slots.default" class="header-content">
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PageHeader',
}
</script>
<script setup>
import { defineProps, defineEmits } from 'vue'
import { Back } from '@element-plus/icons'
defineEmits(['click'])
defineProps({
  icon: {
    type: [Object, String],
    default: Back,
  },
  iconText: {
    type: String,
    default: '返回',
  },
  title: String,
  content: String,
  noIcon: Boolean,
})
</script>

<style lang="scss" scoped>
.header {
  padding: 16px 24px;
  background-color: #fff;
  &-heading {
    &-left {
      display: flex;
      align-items: center;
      .back {
        display: flex;
        align-items: center;
        position: relative;
        margin-right: 40px;
        transition: color 0.2s;
        padding: 2px 0;

        &.left-after {
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

        &:hover {
          color: #409eff;
        }
        .icon {
          width: 18px;
          margin-right: 6px;
        }
        .icon-text {
          font-weight: 500;
        }
      }

      .title {
        font-size: 18px;
        color: #303133;
      }
    }
  }

  &-content {
    color: #909399;
    font-size: 14px;
    margin-top: 10px;
  }
}
</style>
