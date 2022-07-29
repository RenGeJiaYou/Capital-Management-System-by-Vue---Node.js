<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
//在根节点将 jwt 解码信息存到 vuex ,这样刷新就不会清空了
import jwt_decode from "jwt-decode";
//登录界面
export default {
  name: "app",
  component: {},
  created() {
    if (localStorage.token) {
      const userInfo = jwt_decode(localStorage.token);
      //解析结果存储到 vuex 中
      this.$store.dispatch("setAuthenticated", !this.isEmpty(userInfo));
      this.$store.dispatch("setUser", userInfo);
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === null ||
        value === undefined ||
        (typeof value == "object" && Object.keys(value).length === 0) ||
        (typeof value == "string" && value.trim().length() === 0)
      );
    },
  },
};
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
