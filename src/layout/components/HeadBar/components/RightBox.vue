<template>
  <div class="box">
    <notice :notice="noticeData" />

    <router-link custom :to="{ name: 'Reload' }" v-slot="{ navigate }">
      <head-icon name="refresh-line-icon" content="刷新页面" @click="navigate" />
    </router-link>

    <head-icon
      :name="isFullscreen ? 'fullscreen-exit-fill-icon' : 'fullscreen-fill-icon'"
      :content="isFullscreen ? '全屏' : '退出全屏'"
      @click="toggle"
    />

    <head-icon :name="Setting" content="设置" v-if="headerSetting.showSetting" @click="settingDrawerHidden = true" />

    <el-dropdown>
      <div role="button" class="user-wrapper" v-loading="userInfoLoading">
        <div class="name">
          <p class="user-name">{{ userInfo.name }}</p>
          <p class="job-title">{{ userInfo.jobTitle }}</p>
        </div>
        <el-avatar size="medium" :src="userInfo.avatar" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <router-link custom :to="{ name: 'Settings' }" v-slot="{ navigate }">
            <el-dropdown-item @click="navigate">系统设置</el-dropdown-item>
          </router-link>

          <el-link
            style="font-weight: normal"
            :underline="false"
            href="https://miss-sixty.github.io/sixty-admin-docs/"
            target="_blank"
          >
            <el-dropdown-item>项目文档</el-dropdown-item>
          </el-link>
          <el-dropdown-item divided @click="signOut"> 退出登陆 </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <setting-drawer v-model="settingDrawerHidden" />
  </div>
</template>
<script setup>
import HeadIcon from './HeadIcon.vue'
import SettingDrawer from './SettingDrawer.vue'
import { ref, onMounted, computed, watch } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { ElNotification, ElLoading, ElMessageBox } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { useFullscreen } from '@vueuse/core'
import Notice from './Notice.vue'
import { useSettingStore } from '@/store/modules/setting'
import { Setting } from '@element-plus/icons'

const { headerSetting } = useSettingStore()
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

//设置
const settingDrawerHidden = ref(false)

//通知
const noticeData = computed(() => userStore.notice)
const getNotice = () => userStore.getNotice()

//全屏
const { toggle, isFullscreen } = useFullscreen()

//用户信息
const userInfoLoading = ref(false)
const userInfo = computed(() => userStore.userInfo)
const getUserInfo = async () => {
  try {
    userInfoLoading.value = true
    await userStore.getUserInfo()
  } finally {
    userInfoLoading.value = false
  }
}

//退出
const signOut = async () => {
  try {
    await ElMessageBox.confirm('确定要退出登陆吗？', '提示', {
      type: 'warning',
    })
    const loadingInstance = ElLoading.service({
      lock: true,
      text: '退出登录中...',
      spinner: 'el-icon-loading',
    })

    await userStore.clearUserInfo()
    await userStore.exitSystem()
    ElNotification.success({
      title: '提示',
      message: '退出成功！',
    })
    await router.push({ name: 'Login' })
    loadingInstance.close()
  } catch (err) {
    console.log('退出取消或失败')
  }
}

watch(
  () => route.name,
  name => !['Login', 'Reload'].includes(name) && getNotice()
)

onMounted(() => {
  getUserInfo()
  getNotice()
})
</script>
<style lang="scss" scoped>
.box {
  display: flex;
  align-items: center;
  p {
    margin: 0;
  }
  .user-wrapper {
    display: flex;
    align-items: center;
    height: $headbar-height;
    padding: 0 10px;
    &:hover {
      background: rgba(0, 0, 0, 0.04);
    }

    .name {
      margin-right: 5px;
      text-align: right;
      .job-title {
        margin-top: 4px;
        color: #888;
        font-size: 12px;
      }
    }
  }
}
</style>
