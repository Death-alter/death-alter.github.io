import request from "@/utils/request";
const baseUrl = process.env.VUE_APP_THWIKI_BASE_API;

export function getEvents(params) {
  return request({
    url: baseUrl + "/api/events/" + params.start + "/" + params.end,
    method: "get",
  });
}
