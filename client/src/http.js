import axios from "axios";
import { Message, Loading } from "element-ui";

let loading;
function startLoading() {
  loading = Loading.service({
    lock: true, //锁定屏幕的滚动
    text: "加载中......",
    background: "rgba(0,0,0,0.7)",
  });
}

function endLoading() {
  loading.close();
}

//请求拦截
axios.interceptors.request.use(
  config => {
    //在发送请求之前,加载动画(只是插个队,并不影响发送请求)
    startLoading();

    //持有 tolen 时,添加请求报文首部内容
    if (localStorage.getItem("token")) {
      config.headers.Authorization = localStorage.getItem("token");
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

//响应拦截
axios.interceptors.response.use(
  response => {
    // 2xx 范围内的状态码都会触发该函数。
    // 在接到响应之前,结束加载动画
    endLoading();
    return response;
  },
  error => {
    // 超出 2xx 范围的状态码都会触发该函数。
    endLoading();
    Message.error(error.response.data);

    //过期处理
    const { status } = err.response;
    if (status == 401) {
      Message.error("token 过期失效,请重新登陆");
      //清除旧 token
      localStorage.removeItem("token");
      //跳转回登录页面
      this.$router.push("/login");
    }

    return Promise.reject(error);
  }
);

//export default 具有唯一性,只能输出 1个值
export default axios;
