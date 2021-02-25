<template>
  <div class="app-login">
    <el-form
      class="app-login-wrap"
      ref="loginFormRef"
      :rules="formRules"
      :model="formModel"
    >
      <h2>Vue3 Element Admin</h2>
      <el-form-item prop="userName">
        <el-input
          v-model="formModel.userName"
          placeholder="请输入用户名"
          tabindex="1"
        >
          <template #prepend>
            <svg-icon icon-class="user" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="formModel.password"
          :type="pswType"
          placeholder="请输入密码"
          tabindex="2"
        >
          <template #prepend>
            <svg-icon icon-class="password" />
          </template>
          <template #append>
            <svg-icon :icon-class="iconName" @click="handleClickEye" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="app-login__submit">
        <el-button
          :disabled="loading"
          v-loading="loading"
          element-loading-background="transparent"
          type="primary"
          @click="handleSubmit"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ValidateSource } from "async-validator";
import { usePswEys } from "@/views/login/usePswEys";
import { sleep } from "@/utils/sleep";
import { setToken } from "@/utils/auth";

interface FormModel {
  userName: string;
  password: string;
}

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const loading = ref<boolean>(false);
    const loginFormRef = ref<HTMLElement>();
    const formModel = reactive<FormModel>({
      userName: "admin",
      password: "123456"
    });
    const formRules = reactive<Record<string, unknown>>({
      userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }]
    });
    const toggleLoading = (status: boolean) => {
      loading.value = status;
    };
    const handleSubmit = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (loginFormRef.value as any).validate(async (valid: ValidateSource) => {
        if (valid) {
          toggleLoading(true);
          await sleep(2000);
          setToken("__fake__");

          const redirect = (route.query?.redirect as string) || "/";
          toggleLoading(false);
          await router.push({ path: redirect });
        } else {
          toggleLoading(false);
          return false;
        }
      });
    };

    const { pswType, iconName, handleClickEye } = usePswEys();

    return {
      loginFormRef,
      formModel,
      formRules,
      loading,
      handleSubmit,
      pswType,
      iconName,
      handleClickEye
    };
  }
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
