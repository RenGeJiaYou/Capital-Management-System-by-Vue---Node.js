<template>
  <div class="infoshow">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8" class="avatar">
        <div class="user">
          <!-- <img :src="user.avatar" class="avatar" alt="" /> -->
          <i class="fa-solid fa-user-astronaut"></i>
        </div>
      </el-col>

      <el-col :span="16" class="info">
        <div class="userinfo">
          <div class="user-item">
            <!-- 引入的图标要先在 public/index.html 声明 -->
            <i class="fa-solid fa-circle-user"></i>
            <span> {{ user.name }} </span>
          </div>

          <div class="user-item">
            <i class="fa-solid fa-gear"></i>
            <span> {{ user.identity == "manager" ? "管理员" : "员工" }} </span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "info",
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>

<style scoped>
.avatar {
  font-size: 60px;
  background: #ddd;
}

.infoshow {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* padding: 16px; */
}
.row-bg {
  width: 100%;
  height: 100%;
}
.user {
  text-align: center;
  position: relative;
  top: 40%;
}
.user img {
  width: 150px;
  border-radius: 50%;
}
.user span {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.userinfo {
  height: 100%;
  background-color: #aaa;
}
.user-item {
  position: relative;
  top: 30%;
  padding: 26px;
  font-size: 28px;
  color: #333;
}
</style>