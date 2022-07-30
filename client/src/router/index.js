import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/index.vue";
import Register from "../views/register.vue";
import Login from "../views/login"; //加不加 .vue后缀都一样,以此为例
import Home from "../views/home";
import InfoShow from "../views/infoshow";
import FundList from "../views/fundlist";
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
    children: [
      //index.vue 这个页面有若干**子页面**,点击左侧菜单栏时在 <router-view> 中切换
      {
        path: "", //进入到http://localhost:8080/index ,加载index.vue 的同时,也会加载home.vue
        component: Home,
      },
      {
        path: "/home",
        name: "home",
        component: Home,
      },
      {
        path: "/infoshow",
        name: "infoshow",
        component: InfoShow,
      },
      {
        path: "/fundlist",
        name: "fundlist",
        component: FundList,
      },
    ],
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

//路由守卫
router.beforeEach((to, from, next) => {
  const isToken = localStorage.getItem("token") ? true : false;

  //放行无需审查的页面
  if (to.path === "/login" || to.path === "/register") {
    next();
  } else {
    //放行需审查,但持有 token 的页面;禁止需审查,且无 token 的页面
    isToken ? next() : next("/login");
  }
});

export default router;
