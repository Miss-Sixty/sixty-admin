<template>
  <div class="box">
    <head-icon
      :name="Fold"
      padding="0 14px"
      :style="{ transform: settingStore.isPhone || settingStore.collapse ? 'rotateY(180deg)' : 'rotateY(0)' }"
      @click="settingStore.setCollapse"
    />

    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="!settingStore.isPhone">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item to="/home" key="/home">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="item in breadcrumbList"
          :key="item.path"
          :to="pathCompile(item.path)"
        >{{ item.title }}</el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>
<script setup>
import { compile } from 'path-to-regexp'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useSettingStore } from '@/store/modules/setting'
import HeadIcon from './HeadIcon.vue'
import { Fold } from '@element-plus/icons-vue'
const settingStore = useSettingStore()
const route = useRoute()
//面包屑
const breadcrumbList = computed(() =>
  route.matched
    .map(
      item =>
        item.meta?.breadcrumb !== false && item.meta?.title && item.path !== '/home' && { path: item.path, title: item.meta.title }
    )
    .filter(item => item)
)
const pathCompile = path => compile(path)(route.params)
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  align-items: center;
}

// 面包屑动画
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}
.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}
.breadcrumb-leave-active {
  position: absolute;
}
</style>
