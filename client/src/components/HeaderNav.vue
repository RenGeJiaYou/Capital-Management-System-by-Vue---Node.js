<template>
  <div>
    <header class="head-nav">
      <el-row>
        <el-col :span="6" class="logo-container">
          <img src="../assets/logo.png" class="logo" alt="" />
          <span class="title">在线账单·资金管理系统</span>
        </el-col>

        <el-col :span="6" class="user">
          <div class="userinfo">
            <img :src="user.avatar" class="avatar" alt="" />
            <div class="welcome">
              <p class="name comename">欢迎</p>
              <p class="name avatarname">{{ user.name }}</p>
            </div>
            <span class="username">
              <!-- 下拉菜单 -->
              <el-dropdown trigger="click" @command="setDialogInfo">
                <span class="el-dropdown-link">
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="info">个人信息</el-dropdown-item>
                  <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </div>
        </el-col>
      </el-row>
    </header>
  </div>
</template>

<script>
export default {
  name: "header-nav",
  computed: {
    //cpmputed 中的 user() 类似于 data-return 中的 user 数据.
    //data-return 定义数据后怎样用,computed 定义函数后就怎样用
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    setDialogInfo(command) {
      switch (command) {
        case "info":
          this.showInfoList();
          break;
        case "logout":
          this.logOut();
          break;
      }
    },
    showInfoList() {
      console.log("个人消息");
    },
    logOut() {
      //清除token
      localStorage.removeItem("token");
      //重置 vuex
      this.$store.dispatch("clearCurrentState");
      //跳转页面
      this.$router.push("login");
    },
  },
};
// 区别
// watch
// watch是监听一个值的变化，然后执行对应的回调；
// watch中的函数不需要调用；
// watch有两个参数；
// immediate：组件加载立即触发回调函数执行，
// deep: 深度监听，为了发现对象内部值的变化，复杂类型的数据时使用，例如数组中的对象内容的改变
// watch中的函数名称必须要和data中的属性名一致，watch依赖于data中的属性，data中的属性发生变化的时候，watch中的函数就会发生变化。
// watch不支持缓存；

// computed
// computed 是计算属性，通过属性计算得来的属性。
// computed 中的函数直接调用，不用再在函数体后加（）。
// computed 中的函数必须用 return 返回。
// computed 是依赖 data 中的属性，data 中属性发生改变的时候，当前函数才会执行，data 中属性没有改变的时候，当前函数不会执行。
// computed 中不能对 data 中的属性进行赋值操作，如果对 data 中的属性进行赋值，data 中的属性发生变化，从而触发computed中的函数，就会形成死循环。
// computed属性的结果会被缓存，除非依赖的属性发生变化才会重新计算。

// 使用场景
// watch 的使用场景：一个数据影响多个数据,需要在数据变化时执行异步操作或者开销较大的操作时使用。
// 例如：购物车商品结算的时候
// computed：一个数据受多个数据影响，处理复杂的逻辑或多个属性影响一个属性的变化时使用。
// 例如：搜索数据
</script>

<style scoped>
.head-nav {
  width: 100%;
  height: 40px;
  min-width: 600px;
  padding: 5px;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container {
  line-height: 40px;
  min-width: 400px;
  /* background: #000; */
}
.logo {
  height: 35px;
  width: 35px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 16px;
  font-family: "Microsoft YaHei";
  letter-spacing: 7px;
}
.user {
  line-height: 40px;
  text-align: right;
  float: right;
  padding-right: 10px;
  /* background: #fff; */
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}
</style>
