<template>
  <div class="headbar" :class="{ shadow: scrollTop }">
    <div class="left-box">
      <i
        class="el-icon-s-fold headbar__icon left-box__icon"
        @click="collapseChange"
      />
      <el-breadcrumb
        separator="/"
        class="left-box__breadcrumb el-icon-arrow-right"
      >
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <right-box />
  </div>
</template>
<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import RightBox from "./components/RightBox";
export default {
  components: { RightBox },
  setup() {
    const scrollTop = ref(0);
    const onScroll = () => {
      scrollTop.value =
        document.documentElement.scrollTop || document.body.scrollTop;
    };

    const collapseChange = () => {
      // TODO:收缩导航
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
      collapseChange,
      activeName,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/var.scss";
.headbar {
  min-height: $headbar-height;
  background-color: antiquewhite;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  margin-left: $navmenu-width;
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
    &__icon {
      padding: 0px 15px;
    }
    &__breadcrumb {
    }
  }
}
</style>
