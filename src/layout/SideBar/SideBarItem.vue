<template>
  <div>
    <template v-if="!isNested(item)">
      <router-link :to="handleResolvePath(item)" class="sidebar-link">
        <el-menu-item
          :index="handleResolvePath(item)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <svg-icon
            v-if="hasIcon(item)"
            :icon-class="pickDisplayData(item).icon"
          />
          <template #title>
            <span>{{ pickDisplayData(item).title }}</span>
          </template>
        </el-menu-item>
      </router-link>
    </template>

    <el-submenu v-else :index="handleResolvePath(item)">
      <template #title>
        <svg-icon v-if="hasIcon(item)" :icon-class="item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :is-nest="true"
        :item="child"
        :key="child.name"
      />
    </el-submenu>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { RouteRecordRaw } from "vue-router";
import { treePath } from "@ifake/tree-path";
import { sideBarRoutes } from "@/router/routes";

export default defineComponent({
  name: "SidebarItem",
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    // the single route of the root
    const onlyOneRoute = (item: RouteRecordRaw): boolean => {
      return !!(item?.children && item?.children.length === 1);
    };

    // Verify whether there are nested routes. exclude `onlyOneRoute
    const isNested = (item: RouteRecordRaw) => {
      if (onlyOneRoute(item)) {
        return false;
      }
      return !!item?.children;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hasIcon = (item: RouteRecordRaw) => {
      return (
        !!item.meta?.icon || (item?.children && item?.children[0]?.meta?.icon)
      );
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pickDisplayData = (item: any) => {
      if (!isNested(item)) {
        const meta = item.meta || item.children[0].meta;
        if (meta?.icon) {
          return {
            title: meta.title,
            icon: meta?.icon
          };
        }
        return {
          title: meta.title
        };
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleResolvePath = (item: any) => {
      // TODO hack
      if (onlyOneRoute(item)) {
        const isIndex = item.children[0].path === "index";
        return isIndex
          ? `/${item.children[0].name}/index`
          : `/${item.children[0].name}`;
      }
      const handleRoutePath = treePath({
        tree: sideBarRoutes,
        breakCondition: route => route.name === item.name
      });
      const tree = handleRoutePath
        .reduce((res, target) => {
          res.push(target.name);
          return res;
        }, [])
        .join("/");
      return `/${tree}`;
    };

    return {
      isNested,
      hasIcon,
      pickDisplayData,
      handleResolvePath,
      ...toRefs(props)
    };
  }
});
</script>
