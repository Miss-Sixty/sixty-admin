<template>
  <div class="right-box">
    <el-tooltip :content="isFullscreen ? '窗口' : '全屏'" placement="bottom" effect="light">
      <svg-icon :name="isFullscreen ? 'fullscreen-exit-fill' : 'fullscreen-fill'" @click="fullscreen" />
    </el-tooltip>

    <el-tooltip effect="light" content="刷新页面" placement="bottom">
      <svg-icon name="refresh-line" @click="toRouter('Reload')" />
    </el-tooltip>

    <el-popover placement="bottom" :width="300">
      <template #reference>
        <el-badge :value="notice.num" :hidden="notice.num < 1" class="right-box--badge" type="danger">
          <svg-icon name="notification-2-line" />
        </el-badge>
      </template>
      <el-tabs v-model="activeName">
        <el-tab-pane v-for="item in notice.list" :key="item.name" :name="item.name">
          <template #label>
            <el-badge :value="item.num" :hidden="item.num < 1" type="danger" class="right-box__pane--badge">
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
          <el-dropdown-item @click="toRouter('UserPage')">个人设置</el-dropdown-item>
          <el-dropdown-item divided @click="signOut"> 退出登陆 </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import screenfull from 'screenfull'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElLoading } from 'element-plus'
import { useStore } from 'vuex'
import { toRouter, messageBoxChange } from '@/hooks'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const userInfo = computed(() => store.state.user.userInfo)
    const notice = computed(() => store.state.user.notice)

    //全屏
    const fullscreen = () => {
      screenfull.toggle()
    }
    const isFullscreen = ref(false)
    const fullscreenChange = () => {
      isFullscreen.value = screenfull.isFullscreen
    }

    //通知
    // TODO:有个bug，选择了info，但是下面没有横线
    const activeName = ref('0')

    //退出
    const signOut = async () => {
      await messageBoxChange('确定要退出登陆吗？')
      let loadingInstance = ElLoading.service({
        lock: true,
        text: '退出登录中...',
        spinner: 'el-icon-loading',
      })

      await store.dispatch('user/logout')
      store.commit('menu/CLEARROUTERS') //删除动态添加的路由
      loadingInstance.close()
      router.push({ name: 'Login' })
      ElMessage.success({
        message: '退出成功！',
        type: 'success',
      })
    }

    //请求消息接口
    const getNotice = () => store.dispatch('user/getNotice')

    onMounted(() => {
      getNotice()
      if (screenfull.isEnabled) {
        screenfull.on('change', fullscreenChange)
      }
    })
    onBeforeUnmount(() => {
      if (screenfull.isEnabled) {
        screenfull.off('change', fullscreenChange)
      }
    })

    watch(
      () => route.name,
      name => name !== 'Login' && getNotice()
    )

    return {
      fullscreen,
      isFullscreen,
      activeName,
      signOut,
      userInfo,
      notice,
      toRouter,
    }
  },
}
</script>
<style lang="scss" scoped>
.right-box {
  display: flex;
  align-items: center;
  white-space: nowrap;
  .svg-icon {
    padding: 0 10px;
    height: $headbar-height;
    box-sizing: content-box;
    transition: background-color 0.3s;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
  }
  &--badge :deep(.el-badge__content) {
    top: 13px;
    right: 19px;
  }
  &__pane--badge :deep(.el-badge__content) {
    top: 10px;
    right: 6px;
  }
  .user-wrapper {
    cursor: pointer;
    display: flex;
    align-items: center;
    height: $headbar-height;
    padding: 0 8px;
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
