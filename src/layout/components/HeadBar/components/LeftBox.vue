<template>
  <div class="box">
    <el-icon role="button" class="header-icon" :class="{ 'box--isCollapse': collapse }" @click="setCollapse">
      <menu-fold-line />
    </el-icon>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item to="/home" key="/home">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path" :to="pathCompile(item.path)">
          {{ item.title }}
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>
<script setup>
import { compile } from 'path-to-regexp'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useSettingStore } from '@/store/modules/setting'
const settingStore = useSettingStore()
const route = useRoute()
const setCollapse = settingStore.setCollapse
const collapse = computed(() => settingStore.collapse)

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
  .header-icon {
    margin-right: 5px;
    width: 30px;
  }

  &--isCollapse {
    transform: rotateY(180deg);
  }
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
