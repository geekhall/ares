import axios from "axios";
import { ElMessage } from "element-plus";
import router from "~/router";

export default function request(options: any) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      method: 'get',
      // 基础url前缀
      baseURL: 'http://localhost:8001',
      // 请求头信息
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      // 设置超时时间
      timeout: 10000,
      // 携带凭证
      withCredentials: true,
      // 返回数据类型
      responseType: 'json'
    });
    // request 请求拦截器
    instance.interceptors.request.use(
      (config) => {
        let token = localStorage.getItem("pm_token");
        // 发送请求时携带token
        if (token) {
          config.headers.token = token;
        } else {
          router.push("/login");
        }
        return config;
      },
      (error) => {
        // 请求发生错误时
        console.log("request:", error);
        // 判断请求超时
        if (
          error.code === "ECONNABORTED" &&
          error.message.indexOf("timeout") !== -1
        ) {
          ElMessage({ message: "请求超时", type: "error", showClose: true });
        }

        return Promise.reject(error);
      }
    );

    // response 响应拦截器
    instance.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (err) => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = "请求错误";
              break;
            case 401:
              err.message = "未授权，请登录";
              break;
            case 403:
              err.message = "拒绝访问";
              break;
            case 404:
              err.message = `请求地址出错: ${err.response.config.url}`;
              break;
            case 408:
              err.message = "请求超时";
              break;
            case 500:
              err.message = "服务器内部错误";
              break;
            case 501:
              err.message = "服务未实现";
              break;
            case 502:
              err.message = "网关错误";
              break;
            case 503:
              err.message = "服务不可用";
              break;
            case 504:
              err.message = "网关超时";
              break;
            case 505:
              err.message = "HTTP版本不受支持";
              break;
            default:
          }
        }
        console.error(err);
        if (err.message) {
          ElMessage({ message: err.message, type: "error", showClose: true });
        }
        return Promise.reject(err); // 返回接口返回的错误信息
      }
    );
    // 请求处理
    instance(options)
      .then((res) => {
        /**
         * response 统一格式
         * {
         *    code: 200,
         *    msg: '消息[String]',
         *    data: '返回数据[Any]'
         * }
         * code说明：
         * 200 成功
         * -1 失败，可能网络不通，可能后台服务异常或其它异常
         * -2 登录失效跳回登录
         */
        if (res.status === 200) {
          resolve(res);
        } else {
          // 未登录
          if (res.status === -2) {
            router.push("/login");
          }
          ElMessage({ message: res.statusText || "操作失败", type: "error", showClose: true });
          reject(res);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
