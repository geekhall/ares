import request from "~/utils/request/index";

// 用户基本信息
export const userInfo = (data: any) => {
  return request({
    url: "/user/info",
    method: "get",
    data,
  });
}

export const menuTree = (data: any) => {
  return request({
    url: "personal/menuTree",
    method: "get",
    data,
  });
};
