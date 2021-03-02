import { useRequest } from "@/composable/useRequest";

/**
 * 用户登录
 */
export function userLogin(params = {}) {
  return useRequest({
    url: "/user/login",
    method: "GET",
    params
  });
}
