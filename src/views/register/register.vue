<template>
  <div id="register">
    <el-header></el-header>
    <el-header></el-header>
    <div class="box">
      <h1>注册</h1>
      <label><input type="text" placeholder="请输入一个5~10位的用户名" v-model="loginData.userName"></label>
      <label><input type="email" placeholder="请输入你的邮箱" v-model="loginData.userEmail"></label>
      <label><input type="password" placeholder="请输入密码" v-model="loginData.userPassword"></label>
      <label><input type="password" placeholder="请重复一遍密码" v-model="loginData.userPasswordAgain"></label>
      <a class="submit" @click="userRegister">注册</a>
      <div class='bottom'>
          如已有账户，请<a href="/login">登录</a>
      </div>
    </div>
  </div>
</template>

<script>
  import {userRegister} from "@/network/user";

  export default {
    name: "register",
    data() {
      return {
        loginData: {
          userName: "",
          userEmail: "",
          userPassword: "",
          userPasswordAgain: "",
        }
      }
    },
    methods: {
      userRegister() {
        if (this.loginData.userName === '' || this.loginData.userPassword === '') {
          this.$messageBox.showErrorMessage(this, "请完成所有必填项！");
        } else if (this.loginData.userPasswordAgain !== this.loginData.userPassword) {
          this.$messageBox.showErrorMessage(this, "请检查两次密码是否重复!");
        } else if (this.loginData.userName.length < 5 || this.loginData.userName.length > 10 || this.loginData.userPassword.length < 6) {
          this.$messageBox.showErrorMessage(this, "格式错误!");
        } else {
          userRegister(this.loginData.userName, this.loginData.userEmail, this.loginData.userPassword)
                  .then(res => {
                    this.$messageBox.showSuccessMessage(this, res['information']);
                    this.$router.replace('/login')
                  })
                  .catch(res => {
                    this.$messageBox.showErrorMessage(this, res['information']);
                  })
        }

      }
    }
  }
</script>

<style scoped>
  #register {
    height: 100%;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(7, 4, 5, 0.9);
  }

  .box {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
  }

  .box h1 {
    color: white;
    text-transform: uppercase;
    font-weight: 500;
  }

  .box input[type='text'],
  .box input[type='email'],
  .box input[type='password'] {
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 2px solid #3498db;
    padding: 14px 10px;
    width: 280px;
    outline: none;
    color: white;
    border-radius: 24px;
    transition: 0.25s;
  }

  .box input[type='text']:focus {
    width: 300px;
    border-color: #2bccc1;
  }

  .box input[type='password']:focus {
    width: 300px;
    border-color: #03cc35;
  }

  .box input[type='email']:focus {
    width: 300px;
    border-color: #cc3cc1;
  }

  .submit {
    background: none;
    margin: 20px auto;
    display: inline-block;
    text-align: center;
    border: 2px solid #3498db;
    padding: 10px 40px;
    outline: none;
    color: white;
    border-radius: 24px;
    transition: 0.25s;
    cursor: pointer;
    text-decoration: none;
    font-size: 12px;
  }
  .bottom {
      width: 90%;
      height: 100px;
      margin: 0 11.4px 0 11.4px;
      padding-left: 14px;
      color:rgb(131, 131, 131);
  }
  
  .bottom a {
      color: rgb(255, 255, 255);
  }
  
  .bottom a:hover {
      color: rgb(28, 134, 255);
  }
</style>