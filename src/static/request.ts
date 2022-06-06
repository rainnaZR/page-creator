import { request, store } from "@htfed/utils";
import { HtToast } from "@htfed/ui";

request.init({
  baseURL: "https://production.api.dahuangf.com/api/base",
  reqInterceptor: (config: any) => {
    config.headers = {
      ...config.headers,
      token: store.getStorageData("TOKEN"),
    };
    return config;
  },
  resInterceptor: (response: any) => {
    const { code, msg } = response.data || {};
    if (code !== 0 && code !== 200) {
      HtToast.error(msg);
    }
    return response.data;
  },
});

export default request;
