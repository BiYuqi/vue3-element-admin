import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "../layout/index.vue";

const routes: Array<RouteRecordRaw> = [
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
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
