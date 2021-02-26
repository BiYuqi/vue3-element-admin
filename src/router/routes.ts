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
        component: () => import("@/views/dashboard/index.vue"),
        meta: { title: "Dashboard", icon: "dashboard" }
      }
    ]
  },
  {
    path: "/form",
    component: Layout,
    children: [
      {
        path: "index",
        name: "form",
        component: () => import("@/views/form/index.vue"),
        meta: { title: "Form", icon: "form" }
      }
    ]
  },
  {
    path: "/nested",
    name: "nested",
    component: Layout,
    meta: { title: "Nested", icon: "nested" },
    children: [
      {
        path: "menu1",
        name: "menu1",
        component: () => import("@/views/dashboard/index.vue"),
        meta: { title: "Menu1" }
      },
      {
        path: "menu2",
        name: "menu2",
        component: () => import("@/views/nested/menu2/index.vue"),
        meta: { title: "Menu2" },
        children: [
          {
            path: "menu2-1",
            name: "menu2-1",
            component: () => import("@/views/nested/menu2/menu2-1/index.vue"),
            meta: {
              title: "Menu2-1"
            }
          },
          {
            path: "menu2-2",
            name: "menu2-2",
            component: () => import("@/views/nested/menu2/menu2-2/index.vue"),
            meta: {
              title: "Menu2-2"
            }
          }
        ]
      }
    ]
  },
  {
    path: "/setting",
    component: Layout,
    children: [
      {
        path: "index",
        name: "setting",
        component: () => import("@/views/setting/index.vue"),
        meta: { title: "Setting", icon: "setting" }
      }
    ]
  }
];

export const routerWhiteList = ["/login"];
