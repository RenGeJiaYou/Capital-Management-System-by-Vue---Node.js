<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">资金在线管理系统</span>
        <el-form
          :model="loginForm"
          status-icon
          :rules="rules"
          ref="loginForm"
          label-width="auto"
          class="registerForm"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input
              type="email"
              v-model="loginForm.email"
              placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="loginForm.password"
              autocomplete="off"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('loginForm')"
              class="submit_btn"
              >登录</el-button
            >
          </el-form-item>

          <div class="tiparea">
            <p>
              还没有注册?点击
              <router-link to="/register">这里</router-link>
            </p>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { Message } from "element-ui";
import jwt_decode from "jwt-decode";
//登录界面
export default {
  name: "login",
  component: {},
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "邮箱不可为空",
            trigger: "blur",
          },
          {
            type: "email",
            message: "请输入正确的邮箱格式",
          },
        ],
        pass: [
          {
            required: true,
            message: "需要填写密码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 30,
            message: "用户名字符须在6~30个字符内",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post("/api/user/login", this.loginForm).then((res) => {
            Message.success(res.data.msg);
            const { jwt } = res.data;
            //把token 存起来
            localStorage.setItem("token", jwt);
            //解析jwt
            const userInfo = jwt_decode(jwt);
            //解析结果存储到 vuex 中
            this.$store.dispatch("setAuthenticated", !this.isEmpty(userInfo));
            this.$store.dispatch("setUser", userInfo);
            this.$router.push("/index");
          });
        }
      });
    },
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

<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: smaller;
  color: #666;
}
</style>
</style>