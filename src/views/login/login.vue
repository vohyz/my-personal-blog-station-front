<template>
  <div id="login">
    <div class="box">
      <div class="welcome">
        <h1 class="main">Login</h1> 
        <div id="refresh" @click="change()">
          <i class="el-icon-refresh"></i>
        </div>
        <h1 class="hide">Register</h1>
        <label>用于分享技术的个人博客站，在这里可以发点总结的东西</label>
      </div>
      <div class="userBox" v-if="isLogin">
        <input id="userName" type="text" placeholder="请输入用户名" v-model="loginData.userName">
        
        <input type="password" placeholder="请输入密码" v-model="loginData.userPassword">
        <a class="submit" @click="userLogin">Submit</a>
      </div>
      <div class="userBox" v-else>
        <input id="userName" type="text" placeholder="请输入一个5~10位的用户名" v-model="registerData.userName">
        <input type="email" placeholder="请输入你的邮箱" v-model="registerData.userEmail">
        <input type="password" placeholder="请输入密码" v-model="registerData.userPassword">
        <input type="password" placeholder="请重复一遍密码" v-model="registerData.userPasswordAgain">
        <a class="submit" @click="userRegister">Submit</a>
      </div>
    </div>
  </div>
</template>

<script>
  import {userLogin, userRegister} from "../../network/user";
  import {Authentication, ErrorResponse} from "../../models/response_model";

  export default {
    name: "login",
    data() {
      return {
        isLogin: true,
        loginData: {
          userName: "",
          userPassword: "",
        },
        registerData: {
          userName: "",
          userEmail: "",
          userPassword: "",
          userPasswordAgain: "",
        }
      }
    },
    created() {
      this.checkLogin();
    },
    methods: {
      checkLogin() {
        if (window.localStorage.getItem('token') != null) {
          // this.$router.replace('/manage');
        }else{
          this.checkCondition();
        }
      },

      checkCondition() {
        if (this.$route.query.type) {
          this.$messageBox.showErrorMessage(this, "请登录");
        }
      },

      userLogin() {
        if (this.loginData.userName === '' || this.loginData.userPassword === '') {
          this.$messageBox.showErrorMessage(this, "请完成所有必填项！");
        } else if (this.loginData.userName.length > 10) {
          this.$messageBox.showErrorMessage(this, "用户名格式错误");
        } else {
          userLogin(this.loginData.userName, this.loginData.userPassword)
            .then(res => {
                localStorage.setItem('user',this.loginData.userName)
              let r = new Authentication(res);
              r.saveToken();
              this.$messageBox.showSuccessMessage(this, r.information);
              // this.$router.replace('/manage');
            })
            .catch(res => {
              let r = new ErrorResponse(res);
              this.$messageBox.showErrorMessage(this, r.information);
            })
        }
      },
      
      userRegister() {
        if (this.registerData.userName === '' || this.registerData.userPassword === '') {
          this.$messageBox.showErrorMessage(this, "请完成所有必填项！");
        } else if (this.registerData.userPasswordAgain !== this.registerData.userPassword) {
          this.$messageBox.showErrorMessage(this, "请检查两次密码是否重复!");
        } else if (this.registerData.userName.length < 5 || this.registerData.userName.length > 10 || this.registerData.userPassword.length < 6) {
          this.$messageBox.showErrorMessage(this, "格式错误!");
        } else {
          userRegister(this.registerData.userName, this.registerData.userEmail, this.registerData.userPassword)
                  .then(res => {
                    this.$messageBox.showSuccessMessage(this, res['information']);
                    this.change();
                  })
                  .catch(res => {
                    this.$messageBox.showErrorMessage(this, res['information']);
                  })
        }
      
      },
      turnToLogin() {
        document.querySelector('.userBox').style.height = "350px";
        this.$animejs({
          targets: '.welcome>h1.main',
          translateY: 0,
          translateX: 0,
          color: '#000000',
          fontSize: '50px',
          easing: 'easeInOutExpo'
        });
        this.$animejs({
          targets: '.welcome>h1.hide',
          translateY: 0,
          translateX: 0,
          color: '#BBBBBB',
          fontSize: '30px',
          easing: 'easeInOutExpo'
        });
      },
      turnToRegister() {
        document.querySelector('.userBox').style.height = "450px";
        this.$animejs({
          targets: '.welcome>h1.main',
          translateY: 65,
          translateX: 210,
          color: '#BBBBBB',
          fontSize: '30px',
          easing: 'easeInOutExpo'
        });
        this.$animejs({
          targets: '.welcome>h1.hide',
          translateY: -65,
          translateX: -210,
          color: '#000000',
          fontSize: '50px',
          easing: 'easeInOutExpo'
        });
      },
      change() {
        if(this.isLogin){
          this.isLogin = false;
          this.turnToRegister();
        } else {
          this.isLogin = true;
          this.turnToLogin();
        }
      }
    }
  }
</script>

<style scoped>
  #login {
    height: 100%;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgb(225,225,225);
  }
  
  .box {
    width: 800px;
    height: 350px;
    position: relative;
    margin: 0 auto;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .welcome {
    height: 86%;
    width: 100%;
    position: absolute;
    top: 7%;
    background-color: #fff;
    z-index: 10;
  }
  
  .userBox {
    height: 100%;
    width: 50%;
    position: absolute;
    top: 0;
    right: 0;
    background-color: rgb(40,40,50);
    box-shadow: -5px 0px 40px 10px #aaaaaa;
    transition: 0.25s;
    z-index: 11;
    overflow: hidden;
  }
  
  .userBox>label {
    color: #fff;
  }
  
  .welcome h1.main {
    color: black;
    font-family: Helvetica;
    font-weight: 1200;
    font-size: 50px;
    position: absolute;
    top: 15px;
    left: 40px;
  }
  .welcome h1.hide {
    color: #BBBBBB;
    font-family: Helvetica;
    font-weight: 1200;
    font-size: 30px;
    position: absolute;
    top: 80px;
    left: 250px;
  }
  #refresh {
    position: absolute;
    top: 62px;
    left: 247px;
    text-decoration: none;
    color: #000000;
    font-size: 34px;
    font-weight: 1200;
    cursor: pointer;
  }
  #refresh:hover {
    color: #3498db;
  }
  .el-icon-refresh {
  }
  .welcome>label {
    color: #AAAAAA;
    display: block;
    width: 33%;
    position: absolute;
    left: 40px;
    top: 160px;
  }
  
  #userName {
    margin-top: 60px;
    display: block;
  }
  
  .box input {
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 0;
    border-bottom: 2px solid #3498db;
    padding: 14px 10px;
    width: 280px;
    color: white;
    outline: none;
    transition: 0.25s;
  }

  .box input:focus {
    border-bottom: 2px solid #2BCCC1;
  }
  
  .submit {
    background: none;
    display: block;
    text-align: center;
    border: 2px solid #3498db;
    width: 100px;
    padding: 10px 40px;
    outline: none;
    color: white;
    transition: 0.25s;
    border-radius: 24px;
    cursor: pointer;
    text-decoration: none;
    font-size: 24px;
    margin: 60px auto;
  }
</style>