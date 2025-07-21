import axios from "axios";

const instance = axios.create({
  baseURL: "http://api.opaue.shop/",
  timeout: 5000,
});

instance.interceptors.response.use(
  (res) => {
    console.log("[응답 성공]", res);
    return res;
  },
  (err) => {
    console.error("[응답 에러]", err);
    return Promise.reject(err);
  }
);

export default instance;