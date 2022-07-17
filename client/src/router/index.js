import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/index.vue";
import Register from "../views/register.vue";
import Login from "../views/login"; //加不加 .vue后缀都一样,以此为例
import NotFoundPage from "../views/404.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index", //重定向到"/index"这条路由项
  },
  {
    path: "/index",
    name: "index",
    component: Index,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "*", //* 表示未访问到文件
    name: "404",
    component: NotFoundPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
