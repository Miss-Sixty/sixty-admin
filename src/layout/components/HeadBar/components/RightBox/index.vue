<template>
  <div class="right-box">
    <el-tooltip
      :content="isFullscreen ? '窗口' : '全屏'"
      placement="bottom"
      effect="light"
    >
      <div class="headbar__icon">
        <svg-icon
          :name="isFullscreen ? 'fullscreen-exit-fill' : 'fullscreen-fill'"
          @click="fullscreen"
        />
      </div>
    </el-tooltip>

    <el-tooltip effect="light" content="刷新页面" placement="bottom">
      <div class="headbar__icon">
        <svg-icon name="refresh-line" @click="reloadChange" />
      </div>
    </el-tooltip>

    <el-popover placement="bottom" :width="300">
      <template #reference>
        <el-badge
          :value="notice.num"
          :hidden="notice.num < 1"
          class="right-box--badge"
          type="danger"
        >
          <div class="headbar__icon">
            <svg-icon name="notification-2-line" />
          </div>
        </el-badge>
      </template>
      <el-tabs v-model="activeName">
        <el-tab-pane
          :name="item.name"
          v-for="item in notice.list"
          :key="item.name"
        >
          <template #label>
            <el-badge
              :value="item.num"
              :hidden="item.num < 1"
              type="danger"
              class="right-box__pane--badge"
            >
              {{ item.title }}
            </el-badge>
          </template>
          <div style="height: 300px">
            <ul v-if="item.list.length">
              <li v-for="list in item.list" :key="list.id">{{ list.text }}</li>
            </ul>

            <el-empty v-else description="无新的通知" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-popover>

    <el-dropdown>
      <div class="user-wrapper">
        <div class="name">
          <p class="user-name">{{ userInfo.name }}</p>
          <p class="job-title">{{ userInfo.jobTitle }}</p>
        </div>
        <el-avatar size="medium" :src="userInfo.avatar" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="userSettings">个人设置</el-dropdown-item>
          <el-dropdown-item divided @click="signOut">
            退出登陆
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import screenfull from "screenfull";
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage, ElLoading } from "element-plus";
import { useStore } from "vuex";
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const userInfo = computed(() => store.state.user.userInfo);
    const notice = computed(() => store.state.user.notice);

    //全屏
    const fullscreen = () => {
      screenfull.toggle();
    };
    const isFullscreen = ref(false);
    const fullscreenChange = () => {
      isFullscreen.value = screenfull.isFullscreen;
    };

    //通知
    // TODO:有个bug，选择了info，但是下面没有横线
    const activeName = ref("0");

    //个人中心
    const userSettings = () => {
      router.push({ name: "ConfigurationUser" });
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
          try {
            await store.dispatch("user/logout");
            ElMessage.success({
              message: "退出成功！",
              type: "success",
            });
            router.push({ name: "Login" });
            store.commit("menu/CLEARROUTERS");
            loadingInstance.close();
          } catch (err) {
            console.log(err);
            loadingInstance.close();
          }
        })
        .catch(() => {});
    };

    //刷新页面
    const reloadChange = () => {
      router.push({ name: "Reload" });
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
      userSettings,
      signOut,
      userInfo,
      notice,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/var.scss";
.headbar__icon {
  padding: 0px 10px;
  line-height: $headbar-height;
  transition: background-color 0.3s;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
}

.right-box {
  display: flex;
  align-items: center;
  white-space: nowrap;

  &--badge ::v-deep .el-badge__content {
    top: 13px;
    right: 19px;
  }

  &__pane--badge ::v-deep .el-badge__content {
    top: 10px;
    right: 6px;
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
