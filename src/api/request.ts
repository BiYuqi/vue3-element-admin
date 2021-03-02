import axios, { AxiosInstance } from "axios";
import { getToken, removeToken } from "@/utils/auth";

const request: AxiosInstance = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  timeout: 120000,
  headers: {
    "Content-Type": "application/json; charset=UTF-8"
  }
});

/**
 * 注册请求响应拦截
 */
export function interceptors(service: AxiosInstance) {
  service.interceptors.request.use(
    config => {
      if (getToken()) {
        config.headers["Authorization"] = getToken();
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  service.interceptors.response.use(
    response => {
      const res = response.data;
      if (res.code !== 200) {
        switch (res.code) {
          case 401:
            removeToken();
            location.reload();
            break;
          default:
            break;
        }
        return Promise.reject(res.message);
      } else {
        return res;
      }
    },
    error => {
      if (/401/.test(error)) {
        removeToken();
        location.reload();
      }
      return Promise.reject(error);
    }
  );
}

interceptors(request);

/**
 * 导出
 */
export { request };
