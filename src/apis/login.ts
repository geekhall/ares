import request from "~/utils/request";
// 登录
export const login = (data: any) => {
  return request({
    url: "login",
    method: "post",
    data,
  });
};

// 登出
export const logout = () => {
  return request({
    url: "logout",
    method: "get",
  });
};
