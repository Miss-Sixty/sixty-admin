<template>
  <div class="headbar" :class="{ shadow: isScrollTop }">
    <div class="left-box">
      <svg-icon
        name="menu-fold-line"
        class="left-box__icon"
        :class="{ isCollapse }"
        @click="$emit('collapseChange')"
      />
      <el-breadcrumb class="el-icon-arrow-right">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item
            :to="pathCompile(item.path)"
            v-for="item in breadcrumbList"
            :key="item.path"
          >
            {{ item.title }}
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>

    <right-box />
  </div>
</template>
<script>
import { computed } from "vue";
import RightBox from "./components/RightBox";
import { compile } from "path-to-regexp";
import { useRoute } from "vue-router";
export default {
  components: { RightBox },
  props: {
    isScrollTop: Boolean,
    isCollapse: Boolean,
  },
  setup() {
    const route = useRoute();

    //面包屑
    const breadcrumbList = computed(() => {
      const breadcrumbList = [
        {
          path: "/home",
          title: "首页",
        },
      ];
      route.matched.forEach((item) => {
        if (
          item.meta?.title &&
          item.meta?.breadcrumb !== false &&
          item.path !== "/home"
        ) {
          breadcrumbList.push({
            path: item.path,
            title: item.meta.title,
          });
        }
      });
      return breadcrumbList;
    });

    const pathCompile = (path) => {
      var toPath = compile(path);
      return toPath(route.params);
    };

    return {
      breadcrumbList,
      pathCompile,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/var.scss";
.headbar {
  height: $headbar-height;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: $navmenu-bg;
  transition: 0.3s, box-shadow 0.2s;
  box-shadow: 0 0 1px 0 #ccc;
  position: relative;
  z-index: 1;
  &.shadow {
    box-shadow: 0 10px 10px -10px #ccc;
  }

  .left-box {
    white-space: nowrap;
    display: flex;
    align-items: center;
    &__icon {
      padding: 0px 16px;
      height: $headbar-height;
      box-sizing: content-box;
      transition: background-color 0.3s;
      cursor: pointer;
      &:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }
    }
  }
}

.isCollapse {
  transform: rotateY(180deg);
}

// 面包屑动画
.breadcrumb-enter-active {
  transition: all 0.25s;
}
.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(30px);
}
</style>
