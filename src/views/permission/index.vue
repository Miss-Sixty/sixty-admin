<template>
  <page-header no-icon title="权限验证" />
  <page-main style="margin: 20px">
    <div class="box">
      <p>切换帐号</p>
      <el-radio-group v-model="account" @change="accountChange">
        <el-radio-button label="admin" />
        <el-radio-button label="editor" />
      </el-radio-group>
    </div>
    <div class="box">
      <p>帐号权限</p>
      <el-tag>{{ roles }}</el-tag>
    </div>

    <div class="box">
      <p>鉴权指令（请对照代码查看）</p>
      <el-space wrap>
        <el-tag v-auth="'permission.browse'">如果你有 permission.browse 权限则能看到这句话</el-tag>
        <el-tag v-auth="'permission.create'">如果你有 permission.create 权限则能看到这句话</el-tag>
        <el-tag v-auth="['permission.browse', 'permission.create']">
          如果你有 permission.browse 或 permission.create 权限则能看到这句话
        </el-tag>
        <el-tag v-auth-all="['permission.browse', 'permission.create']">
          如果你有 permission.browse 和 permission.create 权限则能看到这句话
        </el-tag>
      </el-space>
    </div>

    <div class="box">
      <p>鉴权组件（请对照代码查看）</p>
      <el-space wrap>
        <auth value="permission.browse">
          <el-tag>你有 permission.create 权限</el-tag>
          <template #no-auth>
            <el-tag type="danger">你没有 permission.browse 权限</el-tag>
          </template>
        </auth>
        <auth value="permission.create">
          <el-tag>你有 permission.create 权限</el-tag>
          <template #no-auth>
            <el-tag type="danger">你没有 permission.create 权限</el-tag>
          </template>
        </auth>
        <auth :value="['permission.browse', 'permission.create']">
          <el-tag>你有 permission.browse 或 permission.create 权限</el-tag>
          <template #no-auth>
            <el-tag type="danger">你没有 permission.browse 或 permission.create 权限</el-tag>
          </template>
        </auth>
        <auth-all :value="['permission.browse', 'permission.create']">
          <el-tag>你有 permission.browse 和 permission.create 权限</el-tag>
          <template #no-auth>
            <el-tag type="danger">你没有 permission.browse 和 permission.create 权限</el-tag>
          </template>
        </auth-all>
      </el-space>
    </div>

    <div class="box">
      <p>鉴权函数（请对照代码查看）</p>
      <el-space wrap>
        <el-button size="small" @click="permissionCheck('permission.browse')">校验 permission.browse 权限</el-button>
        <el-button size="small" @click="permissionCheck('permission.create')">校验 permission.create 权限</el-button>
        <el-button size="small" @click="permissionCheck(['permission.browse', 'permission.create'])">
          校验 permission.browse 或 permission.create 权限
        </el-button>
        <el-button size="small" @click="permissionCheckAll(['permission.browse', 'permission.create'])">
          校验 permission.browse 和 permission.create 权限
        </el-button>
      </el-space>
    </div>
  </page-main>
</template>

<script setup>
import { useUserStore } from '@/store/modules/user'
import { ElLoading, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useAuth, useAuthAll } from '@/hooks/useAuth'

const userStore = useUserStore()
const router = useRouter()
const account = userStore.token
const roles = userStore.roles

const accountChange = async val => {
  let loadingInstance = ElLoading.service({
    text: '切换权限中...',
  })

  await userStore.getToken({
    username: val,
    password: '',
  })

  await Promise.all([userStore.getRoleList(), userStore.getUserInfo()])
  await router.push({ name: 'Reload' })
  loadingInstance.close()
}

const permissionCheck = permissions => {
  if (useAuth(permissions)) {
    ElMessage.success('校验通过')
  } else {
    ElMessage.error('校验不通过')
  }
}

const permissionCheckAll = permissions => {
  if (useAuthAll(permissions)) {
    ElMessage.success('校验通过')
  } else {
    ElMessage.error('校验不通过')
  }
}
</script>
<style lang="scss" scoped>
p {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}
.box:not(:last-of-type) {
  margin-bottom: 20px;
}
</style>
