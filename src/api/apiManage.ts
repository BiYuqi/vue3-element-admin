import { useRequest } from "@/composable/useRequest";

/**
 * If we want to request a backend API, maybe we can do that
 */
export function userLogin(params = {}, manual = false) {
  return useRequest({
    url: "/user/login",
    method: "GET",
    params,
    manual
  });
}
