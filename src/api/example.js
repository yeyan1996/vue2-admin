import axios from "util/axios";

export function radioGroup(query) {
  return axios({
    url: "/radioGroup",
    method: "get",
    params: query
  });
}

export function cascader(query) {
  return axios({
    url: "/cascader",
    method: "get",
    params: query
  });
}

export function formApi(query) {
  return axios({
    url: "/form",
    method: "post",
    data: query
  });
}
