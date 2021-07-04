<template>
  <div class="headbar" :class="{ shadow: scrollTop }">
    <div class="left-box">
      <i
        class="el-icon-s-fold headbar__icon left-box__icon"
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
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import RightBox from "./components/RightBox";
import { compile } from "path-to-regexp";
import { useRoute } from "vue-router";
export default {
  components: { RightBox },
  setup() {
    const route = useRoute();
    const scrollTop = ref(0);
    const onScroll = () => {
      scrollTop.value =
        document.documentElement.scrollTop || document.body.scrollTop;
    };

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

    //通知
    const activeName = ref("info");

    onMounted(() => {
      window.addEventListener("scroll", onScroll);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("scroll", onScroll);
    });

    return {
      scrollTop,
      activeName,
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
  &.shadow {
    box-shadow: 0 10px 10px -10px #ccc;
  }

  &__icon {
    padding: 0px 10px;
    line-height: $headbar-height;
    transition: background 0.3s;
    cursor: pointer;
    font-size: 20px;
    &:hover {
      background: rgba(0, 0, 0, 0.04);
    }
  }

  .left-box {
    white-space: nowrap;
    &__icon {
      padding: 0px 15px;
    }
  }
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
