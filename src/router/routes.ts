import { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

export const baseRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    props: true,
    component: () => import("@/views/login/index.vue")
  }
];

export const notFoundPage: RouteRecordRaw = {
  path: "/:pathMatch(.*)",
  component: () => import("@/views/404/index.vue")
};

export const sideBarRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/index.vue")
      }
    ]
  }
];

export const routerWhiteList = ["/login"];
