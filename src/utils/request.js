import axios from "axios";
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";

const request = axios.create({
  timeout: 30000,
});


export default request