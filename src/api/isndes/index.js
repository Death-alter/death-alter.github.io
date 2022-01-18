import request from "@/utils/request";
const baseUrl = process.env.VUE_APP_ISNDES_BASE_API;

export function getJFRule(params) {
  return request({
    url: baseUrl + "/getJFRule",
    method: "get",
    params,
  });
}
