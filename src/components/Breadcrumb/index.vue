<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ name: 'dashboard' }"
      >Dashboard</el-breadcrumb-item
    >
    <el-breadcrumb-item v-for="item in breadcrumb" :key="item.name">
      {{ item }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { treePath } from "@ifake/tree-path";
import { routes } from "@/router";

export default defineComponent({
  name: "Breadcrumb",
  setup() {
    const breadcrumb = ref<string[]>([]);
    const route = useRoute();

    const handleResolvePath = () => {
      const handleRoutePath = treePath({
        tree: routes,
        breakCondition: r => r.name === route.name
      });

      const getFinalRouteName = new Set<string>();
      const length = handleRoutePath.length;

      for (let i = 0; i < length; i++) {
        const target = handleRoutePath[i];
        if (target?.meta?.title) {
          getFinalRouteName.add(target?.meta?.title);
        }
      }
      breadcrumb.value = [...getFinalRouteName];
    };
    watchEffect(handleResolvePath);

    return {
      breadcrumb
    };
  }
});
</script>
