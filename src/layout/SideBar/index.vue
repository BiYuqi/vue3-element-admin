<template>
  <div class="app-sidebar" :class="{ hidden: sideBarIsOpen }">
    <el-menu
      :uniqueOpened="true"
      :collapse="sideBarIsOpen"
      default-active="dashboard"
      class="el-menu-vertical-demo"
      :background-color="darkColor"
      :text-color="darkTextColor"
      :active-text-color="darkActiveColor"
    >
      <sidebar-item
        v-for="route in routes"
        :item="route"
        :key="route.name"
        :base-path="route.path"
      />
    </el-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, inject } from "vue";
import { useStore } from "vuex";
import { ThemeKey } from "@/global";
import { ThemeValue } from "@/components/plugins/useTheme";
import { RouteRecordRaw } from "vue-router";
import { sideBarRoutes } from "@/router/routes";
import SidebarItem from "@/layout/SideBar/SideBarItem.vue";

export default defineComponent({
  components: {
    SidebarItem
  },
  setup() {
    const store = useStore();
    const sideBarIsOpen = computed(() => store.state.app.sideBarIsOpen);
    const { darkColor, darkActiveColor, darkTextColor } = inject(
      ThemeKey
    ) as ThemeValue;
    const routes = ref<RouteRecordRaw[]>(sideBarRoutes);

    return {
      darkColor,
      darkTextColor,
      darkActiveColor,
      sideBarIsOpen,
      routes
    };
  }
});
</script>
<style lang="scss">
.app-sidebar {
  width: 240px;
  background-color: $darkBg;
  transition: width 0.3s;
  overflow-x: hidden;

  &.hidden {
    width: 60px !important;
  }

  .el-menu {
    border-right: none;

    a {
      text-decoration: none !important;
      &:hover,
      &:focus,
      &:visited {
        text-decoration: none !important;
      }
    }
  }

  :deep(.el-popper) {
    .el-menu--popup {
      padding: 0;
    }
  }

  /* remove default active color */
  .el-menu-item.is-active {
    color: $darkTextColor !important;
  }

  // Not exact match
  .router-link-active .el-menu-item {
    color: $darkActiveColor !important;
  }
  // text margin
  .el-menu .el-menu-item span,
  .el-menu .el-submenu .el-submenu__title span {
    margin-left: 16px;
  }
  // fix collapse bug
  .el-menu--collapse .el-menu-item span,
  .el-menu--collapse .el-submenu .el-submenu__title span,
  .el-menu--collapse .el-submenu .el-submenu__title .el-icon-arrow-right {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }
}
</style>
