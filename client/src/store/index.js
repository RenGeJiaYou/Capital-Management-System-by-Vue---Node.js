import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const type = {
  SET_AUTHENTICATED: "SET_AUTHENTICATED",
  SET_USER: "SET_USER",
};

export default new Vuex.Store({
  state: {
    isAuth: false, //默认没有授权
    user: {}, //存储jwt解析出的用户信息
  },
  //getters 和 vue 的 computed 属性相似,即返回一个**处理后的**数据.且数据不改变时,多次调用都只读取第一次处理后的缓存,而不是重新调用函数.
  //getters 内定义的函数都有一个 state 参数
  getters: {
    isAuth: state => state.isAuth,
    user: state => state.user,
  },
  mutations: {
    //等价于
    //     SET_AUTHENTICATED(state, isAuth){
    //      ...
    //     }
    [type.SET_AUTHENTICATED](state, isAuth) {
      state.isAuth = isAuth;
    },
    [type.SET_USER](state, user) {
      state.user = user;
    },
  },
  //主要是异步操作
  actions: {
    //解构赋值,只取 context 中的 commit 这一部分
    setAuthenticated: ({ commit }, isAuth) => {
      commit(type.SET_AUTHENTICATED, isAuth);
    },
    setUser: ({ commit }, user) => {
      commit(type.SET_USER, user);
    },
    clearCurrentState: ({ commit }) => {
      commit(type.SET_AUTHENTICATED, false);
      commit(type.SET_USER, null);
    },
  },
  modules: {},
});
