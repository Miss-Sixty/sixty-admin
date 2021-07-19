<template>
  <div class="left-box">
    <svg-icon name="menu-fold-line" :class="{ 'left-box--isCollapse': isCollapse }" @click="$emit('collapseChange')" />
    <el-breadcrumb class="el-icon-arrow-right">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path" :to="pathCompile(item.path)">
          {{ item.title }}
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>
<script>
import { compile } from 'path-to-regexp'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  props: {
    isCollapse: Boolean,
  },
  emits: ['collapseChange'],
  setup() {
    const route = useRoute()
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

    return {
      breadcrumbList,
      pathCompile,
    }
  },
}
</script>
<style lang="scss" scoped>
.left-box {
  display: flex;
  align-items: center;
  white-space: nowrap;
  .svg-icon {
    padding: 0px 16px;
    height: $headbar-height;
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
