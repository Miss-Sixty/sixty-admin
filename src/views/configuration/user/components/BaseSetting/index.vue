<template>
  <el-form
    :model="formData"
    ref="formRef"
    label-position="top"
    hide-required-asterisk
    v-loading="state.infoLoading"
  >
    <el-row :gutter="16">
      <el-col :span="24">
        <el-form-item
          prop="avatar"
          :rules="{
            required: true,
            message: '姓名不能为空',
            trigger: 'change',
          }"
        >
          <el-row type="flex" class="avatar">
            <el-avatar shape="square" :size="80" :src="formData.avatar" />
            <div class="avatar-right">
              <el-button size="small" type="primary" @click="upAvatarChange"
                >上传</el-button
              >
              <el-button size="small" @click="resetAvatarChange"
                >重置</el-button
              >
              <p>允许使用 JPG、GIF 或 PNG。最大大小为 800kB</p>
            </div>
          </el-row>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item
          label="姓名"
          prop="name"
          :rules="{
            required: true,
            message: '姓名不能为空',
            trigger: 'blur',
          }"
        >
          <el-input
            v-model="formData.name"
            clearable
            placeholder="请输入姓名"
          />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item
          label="手机号码"
          prop="phone"
          :rules="{
            required: true,
            message: '手机号码不能为空',
            trigger: 'blur',
          }"
        >
          <el-input
            v-model="formData.phone"
            clearable
            placeholder="请输入手机号码"
          />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item
          label="昵称"
          prop="nickname"
          :rules="{
            required: true,
            message: '昵称不能为空',
            trigger: 'blur',
          }"
        >
          <el-input
            v-model="formData.nickname"
            clearable
            placeholder="请输入昵称"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="性别"
          prop="gender"
          :rules="{
            required: true,
            message: '性别不能为空',
            trigger: 'change',
          }"
        >
          <el-select
            v-model="formData.gender"
            placeholder="请选择性别"
            clearable
            style="width: 100%"
          >
            <el-option label="保密" :value="0"></el-option>
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="个人简介" prop="bio">
          <el-input
            v-model="formData.bio"
            type="textarea"
            clearable
            placeholder="请输入个人简介"
            :rows="4"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-button type="primary" @click="addChange">保存更改</el-button>
        <el-button @click="resetDataChange">重 置</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { validateForm, forInData } from "@/hooks";

export default {
  setup() {
    const store = useStore();
    const state = reactive({
      infoLoading: true,
    });
    const { formRef, validateFormChange, resetFieldsForm } = validateForm();

    let formData = reactive({
      name: "",
      gender: 0,
      bio: "",
      phone: "",
      avatar: "",
      nickname: "",
    });

    let backupFormData = reactive({}); //备份表单数据

    // TODO：上传头像未写
    const upAvatarChange = () => {
      console.log("上传头像");
    };

    //重置头像
    const resetAvatarChange = () => {
      formData.avatar = backupFormData.avatar;
      ElMessage.success({
        message: "头像重置成功！",
        type: "success",
      });
    };

    // 新增/修改验证
    const addChange = () => {
      validateFormChange()
        .then(() => {
          getUpDateInfo();
        })
        .catch(() => {});
    };

    //获取用户信息
    const getInfo = () => {
      state.infoLoading = true;
      store
        .dispatch("user/getUserInfo")
        .then((res) => {
          forInData(res, formData);
          backupFormData = Object.assign({}, formData);
        })
        .finally(() => (state.infoLoading = false));
    };

    //重置
    const resetDataChange = () => {
      forInData(backupFormData, formData, ["avatar"]);
      resetFieldsForm();
      ElMessage.success({
        message: "数据重置成功！",
        type: "success",
      });
    };

    //更改用户信息
    const getUpDateInfo = () => {
      state.infoLoading = true;
      store
        .dispatch("user/upDateUserInfo")
        .then((res) => {
          ElMessage.success({
            message: res.message,
            type: "success",
          });
        })
        .finally(() => (state.infoLoading = false));
    };

    onMounted(() => {
      getInfo();
    });
    return {
      formData,
      state,
      resetDataChange,
      formRef,
      addChange,
      upAvatarChange,
      resetAvatarChange,
    };
  },
};
</script>
<style lang="scss" scoped>
.avatar {
  &-right {
    margin-left: 20px;
    p {
      margin: 0;
      font-size: 13px;
      color: #888;
    }
  }
}
::v-deep .el-form-item__label {
  padding: 0;
  line-height: 30px;
}
</style>
