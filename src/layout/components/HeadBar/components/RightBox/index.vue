<template>
  <div class="right-box">
    <el-tooltip
      :content="isFullscreen ? '窗口' : '全屏'"
      placement="bottom"
      effect="light"
    >
      <i
        class="headbar__icon"
        :class="isFullscreen ? 'el-icon-minus' : 'el-icon-plus'"
        @click="fullscreen"
      />
    </el-tooltip>

    <el-tooltip effect="light" content="刷新页面" placement="bottom">
      <i class="headbar__icon el-icon-refresh" @click="reloadChange" />
    </el-tooltip>

    <el-popover
      placement="bottom"
      :width="300"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <template #reference>
        <el-badge :value="3" class="right-box--badge" type="danger">
          <i class="headbar__icon el-icon-bell" />
        </el-badge>
      </template>
      <el-tabs v-model="activeName">
        <el-tab-pane label="通知" name="info">
          <el-empty description="无新的通知" />
        </el-tab-pane>
        <el-tab-pane label="新消息" name="sessage">
          <el-empty description="无新的消息" />
        </el-tab-pane>
      </el-tabs>
    </el-popover>

    <el-dropdown>
      <div class="user-wrapper">
        <div class="name">
          <p class="user-name">张三丰</p>
          <p class="job-title">研发经理</p>
        </div>
        <el-avatar size="medium">
          <i class="el-icon-user-solid" />
        </el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="editPassword">修改密码</el-dropdown-item>
          <el-dropdown-item divided @click="signOut">
            退出登陆
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import screenfull from "screenfull";
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage, ElLoading } from "element-plus";
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    //全屏
    const fullscreen = () => {
      screenfull.toggle();
    };
    const isFullscreen = ref(false);
    const fullscreenChange = () => {
      isFullscreen.value = screenfull.isFullscreen;
    };

    //通知
    const activeName = ref("info");

    //修改密码
    const editPassword = () => {
      console.log("editPassword");
    };

    //退出
    let loadingInstance = null;
    const signOut = () => {
      ElMessageBox.confirm("确定要退出登陆吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          loadingInstance = ElLoading.service({
            lock: true,
            text: "退出登录中...",
            spinner: "el-icon-loading",
          });

          await store.dispatch("user/logout");

          ElMessage.success({
            message: "退出成功！",
            type: "success",
          });

          router.push({ name: "Login" });
        })
        .finally(() => loadingInstance.close());
    };

    //刷新页面
    const reloadChange = () => {
      router.push({ name: "Reload" });
    };

    const handleCommand = (command) => {
      console.log(command);
    };

    onMounted(() => {
      if (screenfull.isEnabled) {
        screenfull.on("change", fullscreenChange);
      }
    });
    onBeforeUnmount(() => {
      if (screenfull.isEnabled) {
        screenfull.off("change", fullscreenChange);
      }
    });

    return {
      fullscreen,
      isFullscreen,
      activeName,
      reloadChange,
      handleCommand,
      editPassword,
      signOut,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/var.scss";
.headbar__icon {
  padding: 0px 8px;
  line-height: $headbar-height;
  transition: background 0.3s;
  cursor: pointer;
  font-size: 20px;
  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
}

.right-box {
  display: flex;
  align-items: center;
  white-space: nowrap;

  &--badge ::v-deep .el-badge__content {
    top: 12px;
    right: 18px;
  }

  .user-wrapper {
    cursor: pointer;
    display: flex;
    align-items: center;
    height: $headbar-height;
    padding: 0px 8px;
    &:hover {
      background: rgba(0, 0, 0, 0.04);
    }

    p {
      margin: 0;
      margin-right: 5px;
      text-align: right;
    }
    .user-name {
      margin-bottom: 4px;
    }
    .job-title {
      color: #888;
      font-size: 12px;
    }
  }
}
</style>
