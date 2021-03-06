<template>
  <div v-if="!isHidden(item)">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
          (!onlyOneChild.children || onlyOneChild.noShowingChildren)
      "
    >
      <sidebar-link :to="resolvePath(onlyOneChild.path)" class="sidebar-link">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <svg-icon
            v-if="hasIcon(item)"
            :icon-class="getDisplayInfo(item).icon"
          />
          <template #title>
            <span>{{ getDisplayInfo(item).title }}</span>
          </template>
        </el-menu-item>
      </sidebar-link>
    </template>

    <el-submenu v-else :index="resolvePath(item.path)">
      <template #title>
        <svg-icon v-if="hasIcon(item)" :icon-class="item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :is-nest="true"
        :item="child"
        :key="child.path"
        :base-path="resolvePath(child.path)"
      />
    </el-submenu>
  </div>
</template>

<script lang="ts">
import * as path from "path";
import { defineComponent, toRefs, ref } from "vue";
import { RouteRecordRaw } from "vue-router";
import { isExternal } from "@/utils/validate";
import SidebarLink from "./Link.vue";

export default defineComponent({
  name: "SidebarItem",
  components: {
    SidebarLink
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    // The single route of the root
    const isSingleRoute = (item: RouteRecordRaw): boolean => {
      return !!(item?.children && item?.children.length === 1);
    };

    // Verify whether there are nested routes. exclude `isSingleRoute`
    const isNested = (item: RouteRecordRaw) => {
      if (isSingleRoute(item)) {
        return false;
      }
      return !!item?.children;
    };

    const isHidden = (item: RouteRecordRaw) => {
      return item.meta && item.meta?.hidden;
    };

    const hasIcon = (item: RouteRecordRaw) => {
      return (
        !!item.meta?.icon || (item?.children && item?.children[0]?.meta?.icon)
      );
    };

    const onlyOneChild = ref<RouteRecordRaw>();
    const hasOneShowingChild = (
      children: RouteRecordRaw[] = [],
      parent: RouteRecordRaw
    ) => {
      const showingChildren = children.filter(item => {
        if (item?.meta?.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          onlyOneChild.value = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    };
    // TODO resolve type problem
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getDisplayInfo = (item: any) => {
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

    const resolvePath = (routePath: string) => {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(props.basePath)) {
        return props.basePath;
      }
      return path.resolve(props.basePath, routePath);
    };

    return {
      isNested,
      isHidden,
      hasIcon,
      getDisplayInfo,
      resolvePath,
      hasOneShowingChild,
      onlyOneChild,
      ...toRefs(props)
    };
  }
});
</script>
