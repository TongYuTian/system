<template>
  <div class="login-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="50px" class="login-form">
      <h2 class="login-title">积云仙女管理系统</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号" value="admin"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入密码" value="123456"></el-input>
      </el-form-item>
      <el-button type="primary" @click="submitForm('form')">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import loginApi from "../api/login";
import login from "../api/login";

export default {
  name: "",
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: {
          required: true,
          message: "请输入账号",
          trigger: "blur"
        },
        password: {
          required: true,
          message: "请输入密码",
          trigger: "blur"
        }
      }
    };
  },
  props: {},
  components: {},
  mounted() {},
  methods: {
    // 点击提交表单事件
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 调用登录接口
          loginApi
            .getLogin(this.form.username, this.form.password)
            .then(res => {
              // 登录成功
              if (res.data.flag) {
                loginApi
                  .getInfo(res.data.token)
                  .then(resp => {
                    // 1.将获取到的用户信息存储到本地
                    localStorage.setItem(
                      "info",
                      JSON.stringify(resp.data.data)
                    );
                    // 2.将token存储到本地
                    localStorage.setItem("adminToken", res.data.data.token);
                    // 3.跳转到首页
                    this.$router.push({
                      path: "/Home"
                    });
                  })
                  .catch(error => {
                    console.log(error.res);
                  });
              } else {
                this.$message({
                  message: "登录失败！",
                  showClose: true,
                  duration: 3000,
                  type: "warning"
                });
                return false;
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          // console.log("error submit!!");
          this.$message({
            message: "登录失败",
            showClose: true,
            duration: 3000,
            type: "warning"
          });
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-form {
  width: 350px;
  margin: 160px auto;
  background: rgb(255, 255, 255, 0.8);
  padding: 40px;
  border-radius: 20px;
}
.login-title {
  text-align: center;
  color: #303133;
}
.login-container {
  width: 100%;
  height: 100%;
  background: url("../assets/login.jpg") 0 0 repeat;
  position: absolute;
  overflow: hidden;
}
</style>