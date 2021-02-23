import { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

export const baseRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue")
  }
];

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
