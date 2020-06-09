<template>
  <div>
    <!-- 左侧logo和标题 -->
    <a href="javascript:;">
      <img class="logo" src="../../assets/logoIndex.png" width="25px" alt />
      <span class="system">积云仙女管理系统</span>
    </a>

    <!-- 右侧下拉菜单 -->
    <el-dropdown @command="handleCommand" trigger="click">
      <span class="el-dropdown-link">
        {{ userInfo.name }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="changePassword">
          <i class="el-icon-edit"></i>
          修改密码
        </el-dropdown-item>
        <el-dropdown-item command="loginOut">
          <i class="el-icon-s-fold"></i>
          退出系统
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import loginApi from "../../api/login";

export default {
  name: "",
  data() {
    return {
      userInfo: ""
    };
  },
  props: {},
  created() {
    const info = localStorage.getItem("info");
    this.userInfo = JSON.parse(info);
    console.log(this.userInfo);
  },
  components: {},
  mounted() {},
  methods: {
    // 退出登录和修改密码操作
    handleCommand(command) {
      switch(command){
        case "changePassWord" :
          this.changePassword() 
          break;
        case "loginOut" :
          this.loginOut()
          break;
        default:
          break;  
      }
    },
    // 退出登录
    loginOut() {
      const token = localStorage.getItem("adminToken");
      console.log(loginApi.loginOut())
      loginApi
        .loginOut(token)
        .then(res => {
          const resp = res.data;
          if(resp.flag){
            // 清除用户信息
            localStorage.removeItem("info");
            // 清除token
            localStorage.removeItem('adminToken')
            // 跳转到首页
            this.$router.push({
              path:'/'
            })
          }else {
            this.$message({
            message: resp.message,
            type: 'warning'
          });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.logo {
  vertical-align: middle;
  padding: 0 10px 0 40px;
}
.system {
  color: #fff;
  position: absolute;
}

.el-dropdown {
  float: right;
  margin-right: 40px;
  cursor: pointer;
}

.el-dropdown-link {
  color: #fff;
}
</style>