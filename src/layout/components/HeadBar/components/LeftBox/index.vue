<template>
  <div class="left-box">
    <el-icon class="icon" :class="{ 'left-box--isCollapse': isCollapse }" @click="toggleSidebarCollapse">
      <menu-fold-line />
    </el-icon>
    <el-breadcrumb v-if="mode !== 'phone'">
      <transition-group name="breadcrumb">
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
import { useStore } from 'vuex'

const store = useStore()
const route = useRoute()

// 切换侧边栏导航展开/收起
const toggleSidebarCollapse = () => {
  store.commit('setting/TOOGLE_SIDEBAR_COLLAPSE')
}

const isCollapse = computed(() => store.state.setting.sidebarCollapse)
const mode = computed(() => store.state.setting.mode)

//面包屑
const breadcrumbList = computed(() => {
  const breadcrumbList = [
    {
      path: '/home',
      title: '首页',
    },
  ]
  route.matched.forEach(item => {
    if (item.meta?.title && item.meta?.breadcrumb !== false && item.path !== '/home') {
      breadcrumbList.push({
        path: item.path,
        title: item.meta.title,
      })
    }
  })
  return breadcrumbList
})

const pathCompile = path => compile(path)(route.params)
</script>
<style lang="scss" scoped>
.left-box {
  display: flex;
  align-items: center;
  white-space: nowrap;
  .icon {
    padding: 0 16px;
    font-size: 18px;
    height: $headbar-height;
    display: flex;
    align-items: center;
    box-sizing: content-box;
    transition: background-color 0.3s;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
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
