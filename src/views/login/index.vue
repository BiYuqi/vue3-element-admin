<template>
  <div class="app-login">
    <el-form class="app-login-wrap" ref="loginForm" :model="formModel">
      <h2>Vue3 Element Admin</h2>
      <el-form-item prop="userName">
        <el-input v-model="formModel.userName" placeholder="请输入用户名">
          <template #prepend>
            <svg-icon icon-class="user"></svg-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="userName">
        <el-input v-model="formModel.password" placeholder="请输入密码">
          <template #prepend>
            <svg-icon icon-class="password"></svg-icon>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from "vue";

interface FormModel {
  userName: string;
  password: string;
}

export default defineComponent({
  setup() {
    const loginForm = ref<HTMLElement>();
    const formModel = reactive<FormModel>({
      userName: "",
      password: ""
    });

    return {
      loginForm,
      formModel
    };
  }
});
</script>
<style lang="scss" scoped>
$itemColor: #454545;

.app-login {
  background-color: $darkBg;
  min-height: 100%;
  width: 100%;
  overflow: hidden;

  &-wrap {
    position: relative;
    width: 520px;
    padding: 25vh 35px 0 35px;
    max-width: 100%;
    margin: 0 auto;
    color: #eee;

    :deep(.el-input input) {
      background-color: transparent;
      border-color: transparent;
      padding: 4px 0 4px 0;
      height: 50px;
      color: #eeeeee;
    }

    :deep(.el-form-item) {
      border: 1px solid hsla(0, 0%, 100%, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: $itemColor;
      margin-bottom: 22px;
    }

    :deep(.el-input-group__prepend) {
      background-color: transparent;
      border-color: transparent;
      svg {
        color: #eee;
      }
    }
  }

  h2 {
    margin-bottom: 20px;
    text-align: center;
  }
}
</style>
