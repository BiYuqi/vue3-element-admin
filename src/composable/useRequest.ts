import { isRef, reactive, toRefs, ToRefs } from "vue";
import { Method } from "axios";
import { request } from "@/api/request";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface UseRequest {
  url: string;
  params?: any;
  manual?: boolean;
  method: Method;
}

interface UseRequestParam {
  result: {};
  loading: boolean;
  error: Error | null;
}

interface Run {
  run: () => Promise<void>;
}

type UseRequestReturn = ToRefs<UseRequestParam> & Run;

function ensureRefToValue(params: Record<string, any>) {
  const result = {
    ...params
  };
  Object.keys(params).forEach(key => {
    const val = params[key];
    result[key] = isRef(val) ? val.value : val;
  });

  return result;
}

function getRequestDataKey(method: Method) {
  return method.toUpperCase() === "GET" ? "params" : "data";
}

export function useRequest({
  url,
  params = {},
  method,
  manual = false
}: UseRequest): UseRequestReturn {
  const data = reactive<UseRequestParam>({
    result: {},
    loading: false,
    error: null
  });
  const run = async (): Promise<void> => {
    try {
      data.loading = true;
      const res = await request({
        url,
        method,
        [getRequestDataKey(method)]: ensureRefToValue(params)
      });
      data.loading = false;
      // maybe we need to check the response code
      data.result = res;
    } catch (e) {
      data.loading = false;
      data.error = e;
    }
  };
  !manual && run();

  return {
    ...toRefs(data),
    run
  };
}
