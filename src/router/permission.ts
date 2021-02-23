import { Router } from "vue-router";
import { routerWhiteList } from "@/router/routes";
import { getToken } from "@/utils/auth";

export function usePermission(router: Router) {
  if (!router) {
    throw new Error("router instance is required");
  }
  router.beforeEach((to, from, next) => {
    const hasToken = getToken();
    if (hasToken) {
      if (to.path === "/login") {
        // Login detected, default jump to the home page
        return next({ path: "/" });
      } else {
        return next();
      }
    } else {
      if (routerWhiteList.includes(to.path)) {
        // Direct release of whitelist
        return next();
      } else {
        // Others do not have permission to jump directly to the login page
        return next(`/login?redirect=${to.path}`);
      }
    }
  });
}
