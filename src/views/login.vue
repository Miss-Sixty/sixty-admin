<template>
  <el-row type="flex" class="login" justify="center">
    <div class="form">
      <el-form :model="login" ref="validateForm" label-width="0">
        <el-form-item>
          <h2 :style="{ margin: 0 }">{{ setting.title }}</h2>
        </el-form-item>

        <el-form-item
          prop="username"
          :rules="{ required: true, message: '请输入用户名', trigger: 'blur' }"
        >
          <el-input
            v-model="login.username"
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
            clearable
            :disabled="login.loading"
          />
        </el-form-item>

        <el-form-item
          prop="password"
          :rules="{ required: true, message: '请输入密码', trigger: 'blur' }"
        >
          <el-input
            v-model="login.password"
            show-password
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            clearable
            :disabled="login.loading"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            :loading="login.loading"
            :style="{ width: '100%' }"
            @click="loginChange"
          >
            登陆
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-row>
</template>
<script>
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import setting from "@/setting";
import { ElMessage } from "element-plus";
export default {
  name: "Login",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const validateForm = ref(null);

    const login = reactive({
      username: "admin",
      password: "123456",
      loading: false,
    });

    //账号密码验证
    const loginChange = () => {
      validateForm.value
        .validate()
        .then(() => {
          getLogin();
        })
        .catch(() => {});
    };

    // 登陆
    const getLogin = () => {
      login.loading = true;
      store
        .dispatch("user/login", login)
        .then(() => {
          ElMessage.success({
            message: "登陆成功！",
            type: "success",
          });
          router.replace({
            path: (route.query && route.query.redirect) || "/",
          });
        })
        .finally(() => {
          login.loading = false;
        });
    };

    return {
      login,
      loginChange,
      validateForm,
      setting,
    };
  },
};
</script>
<style lang="scss" scoped>
.login {
  height: 100%;
  width: 100%;
  background-color: cadetblue;
  .form {
    width: 350px;
    margin-top: 170px;
    text-align: center;
  }
}
</style>
‰
