import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { baseRoutes, sideBarRoutes, notFoundPage } from "@/router/routes";
import { usePermission } from "@/router/permission";

const routes: Array<RouteRecordRaw> = [
  ...baseRoutes,
  ...sideBarRoutes,
  notFoundPage
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

/** permission check */
usePermission(router);

export default router;
