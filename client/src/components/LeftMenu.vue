<template>
  <div>
    <el-row class="menu-page">
      <el-col>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#324057"
          text-color="#fff"
          active-text-color="#409eff"
        >
          <router-link to="/home">
            <el-menu-item index="1">
              <template slot="title">
                <i class="fa-solid fa-house"></i>
                <span class="menu-title">首页</span>
              </template>
            </el-menu-item>
          </router-link>

          <el-submenu index="2">
            <template slot="title">
              <i class="fa-solid fa-wallet"></i>
              <span
                slot="title"
                class="menu-title"
              >资金管理</span>
            </template>
            <!--为了让<router-link> 内的元素点起来像<el-menu-item> 而不是一个普通超链接,设置  tag-->
            <router-link
              to="/fundlist"
              tag="el-menu-item"
            >
              <el-menu-item index="2-1">
                <i class="fa-solid fa-money-bill-transfer"></i>
                资金流水
              </el-menu-item>
            </router-link>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="fa-solid fa-circle-info"></i>
              <span class="menu-title">信息管理</span>
            </template>
            <router-link
              to="/infoshow"
              tag="el-menu-item"
            >
              <el-menu-item index="3-1">
                <i class="fa-solid fa-person"></i>
                个人信息
              </el-menu-item>
            </router-link>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "left-menu",
  methods: {
    handleOpen(k, path) {
      console.log(k, path);
    },
    handleClose(k, path) {
      console.log(k, path);
    },
  },
};
</script>

<style scoped>
.menu-page {
  position: fixed;
  width: 20%;
  min-height: 100%;
  background-color: #324057;
}
.menu-title {
  margin-left: 15px;
}
</style>
