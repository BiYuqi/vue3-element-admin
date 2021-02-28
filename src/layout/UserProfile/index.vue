<template>
  <el-dropdown class="user-profile" @command="handleCommand">
    <span class="el-dropdown-link">
      <img class="profile-img" src="~assets/logo.png" alt="" />
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="home">
          <el-link href="javascript:;" :underline="false">Home</el-link>
        </el-dropdown-item>
        <el-dropdown-item command="github">
          <el-link
            href="https://github.com/ifakejs/vue3-element-admin"
            target="_blank"
            :underline="false"
            >Github</el-link
          >
        </el-dropdown-item>
        <el-dropdown-item command="doc">
          <el-link href="javascript:;" :underline="false">Doc</el-link>
        </el-dropdown-item>
        <el-dropdown-item command="logout" divided>
          <el-link href="javascript:;" :underline="false">Logout</el-link>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { removeToken } from "@/utils/auth";

type Commands = "home" | "github" | "doc" | "logout";

enum CommandsValue {
  HOME = "home",
  GITHUB = "home",
  DOC = "doc",
  LOGOUT = "logout"
}

export default defineComponent({
  setup() {
    const router = useRouter();
    const handleCommand = (command: Commands) => {
      switch (command) {
        case CommandsValue.HOME:
          router.push({ path: "/" });
          break;
        case CommandsValue.LOGOUT:
          removeToken();
          router.push({ path: "/login" });
          break;
        case CommandsValue.DOC:
          alert("还在开发中");
          break;
      }
    };

    return {
      handleCommand
    };
  }
});
</script>

<style lang="scss">
.user-profile {
  position: absolute !important;
  right: 2%;
}
.profile-img {
  width: 30px;
  height: 30px;
}
</style>
