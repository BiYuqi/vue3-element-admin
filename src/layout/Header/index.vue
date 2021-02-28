<template>
  <div class="header-container">
    <div class="header-toggle">
      <svg-icon :icon-class="icon" @click="handleToggle" />
      <breadcrumb />
      <user-profile />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import UserProfile from "../UserProfile/index.vue";

export default defineComponent({
  components: {
    UserProfile
  },
  setup() {
    const store = useStore();
    const icon = computed(() =>
      store.state.app.sideBarIsOpen ? "unfold" : "indent"
    );

    const handleToggle = () => {
      store.commit("app/toggleSideBar", !store.state.app.sideBarIsOpen);
    };

    return {
      icon,
      handleToggle
    };
  }
});
</script>
<style lang="scss" scoped>
.header-container {
  height: 50px;
  background-color: #fff;
  display: flex;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}
.header-toggle {
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 20px;
  }
}
</style>
