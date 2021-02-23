import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { baseRoutes, sideBarRoutes } from "@/router/routes";
import { usePermission } from "@/router/permission";

const routes: Array<RouteRecordRaw> = [...baseRoutes, ...sideBarRoutes];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

usePermission(router);

export default router;
