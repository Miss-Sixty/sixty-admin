<template>
  <div v-loading.fullscreen.lock="loading" element-loading-text="切换用户中...">
    <page-header title="权限验证" />
    <div class="page-main">
      <h3>切换帐号</h3>
      <el-radio-group v-model="account" @change="accountChange">
        <el-radio-button label="admin" />
        <el-radio-button label="editor" />
      </el-radio-group>
      <h3>帐号权限</h3>
      <div>{{ roles }}</div>

      <h3>鉴权指令（请对照代码查看）</h3>
      <div>
        <div v-auth="'permission.browse'">如果你有 permission.browse 权限则能看到这句话</div>
        <div v-auth="'permission.create'">如果你有 permission.create 权限则能看到这句话</div>
        <div v-auth="['permission.browse', 'permission.create']">
          如果你有 permission.browse 或 permission.create 权限则能看到这句话
        </div>
        <div v-auth-all="['permission.browse', 'permission.create']">
          如果你有 permission.browse 和 permission.create 权限则能看到这句话
        </div>
      </div>

      <h3>鉴权组件（请对照代码查看）</h3>
      <div>
        <auth value="permission.create" style="margin-bottom: 10px">
          <el-tag>你有 permission.create 权限</el-tag>
          <template #no-auth>
            <el-tag type="danger">你没有 permission.create 权限</el-tag>
          </template>
        </auth>
        <auth :value="['permission.browse', 'permission.create']" style="margin-bottom: 10px">
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
      </div>

      <h3>鉴权函数（请对照代码查看）</h3>
      <div>
        <el-button-group style="display: block; margin-bottom: 10px">
          <el-button @click="permissionCheck('permission.browse')">校验 permission.browse 权限</el-button>
          <el-button @click="permissionCheck('permission.create')">校验 permission.create 权限</el-button>
        </el-button-group>
        <el-button-group>
          <el-button @click="permissionCheck(['permission.browse', 'permission.create'])"
            >校验 permission.browse 或 permission.create 权限</el-button
          >
          <el-button @click="permissionCheckAll(['permission.browse', 'permission.create'])"
            >校验 permission.browse 和 permission.create 权限</el-button
          >
        </el-button-group>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { auth, authAll } from '@/utils'
import { ElMessage } from 'element-plus'
export default {
  setup() {
    const store = useStore()
    const account = ref(store.state.user.token)
    const loading = ref(false)

    const accountChange = async val => {
      try {
        loading.value = true
        await store.dispatch('user/login', {
          username: val,
          password: '',
        })

        await store.dispatch('user/getUserInfo')

        loading.value = false
        location.reload()
      } catch (err) {
        console.log(err)
        loading.value = false
      }
    }

    const permissionCheck = permissions => {
      if (auth(permissions)) {
        ElMessage.success('校验通过')
      } else {
        ElMessage.error('校验不通过')
      }
    }
    const permissionCheckAll = permissions => {
      if (authAll(permissions)) {
        ElMessage.success('校验通过')
      } else {
        ElMessage.error('校验不通过')
      }
    }

    return {
      roles: store.state.user.roles,
      account,
      accountChange,
      permissionCheck,
      permissionCheckAll,
      loading,
    }
  },
}
</script>
