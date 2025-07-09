<template>
    <div class="LoginBackground">
      <div class="LoginForm" ><!--v-if="isLogin"-->
          <div class="big-contain" > <!--v-if="isLogin"-->
              <el-form :model="loginForm" ref="loginForm" status-icon>
            <div class="bform">
              <el-form-item prop="username" :rules="loginRules.usernameRules" class="NameNotNull">
                <div class="UserName">
                    <img src="../assets/username.png" class="Logo">
                    <input
                            class="Input"
                            type="text"
                            v-model="loginForm.username"
                            autocomplete="off"
                            :placeholder="$t('login.username')"
                    />
                </div>
              </el-form-item>
              <el-form-item prop="password" :rules="loginRules.passwordRules" class="PasswordNotNull">
                <div class="PassWord">
                    <img src="../assets/password.png" class="Logo">
                    <input
                            class="Input"
                            type="password"
                            v-model="loginForm.password"
                            autocomplete="off"
                            :placeholder="$t('login.password')"
                            @keydown.enter="handleLogin('loginForm')"
                    />
                </div>
              </el-form-item>
              <el-form-item>
                  <button class="LoginBtn" @click="handleLogin('loginForm')"/>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
        <!--<div v-else>-->
            <!--<div class="RegisterForm" v-if="!isLogin">-->
                <!--<el-form :model="loginForm" ref="loginForm" status-icon>-->
                    <!--<div class="bform">-->
                        <!--<el-form-item prop="username" :rules="loginRules.usernameRules" class="NameNotNull">-->
                            <!--<div class="UserName">-->
                                <!--<img src="../assets/username.png" class="Logo">-->
                                <!--<input-->
                                        <!--class="Input"-->
                                        <!--type="text"-->
                                        <!--v-model="loginForm.username"-->
                                        <!--autocomplete="off"-->
                                        <!--placeholder="用户名"-->
                                <!--/>-->
                            <!--</div>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item prop="password" :rules="loginRules.passwordRules" class="PasswordNotNull">-->
                            <!--<div class="PassWord">-->
                                <!--<img src="../assets/password.png" class="Logo">-->
                                <!--<input-->
                                        <!--class="Input"-->
                                        <!--type="password"-->
                                        <!--v-model="loginForm.password"-->
                                        <!--autocomplete="off"-->
                                        <!--placeholder="密码"-->
                                        <!--@keydown.enter.native="handleLogin('loginForm')"-->
                                <!--/>-->
                            <!--</div>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item>-->
                            <!--<button class="LoginBtn" @click="changeType()"/><button class="RegistBtn" @click="submitForm('loginForm')"/>-->
                        <!--</el-form-item>-->
                    <!--</div>-->
                <!--</el-form>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="big-contain" v-else>-->
          <!--<h3 class="btitle">创建账户</h3>-->
          <!--<el-form-->
            <!--:model="loginForm"-->
            <!--:rules="rules"-->
            <!--ref="loginForm"-->
            <!--status-icon-->
          <!--&gt;-->
            <!--<div class="bform">-->
              <!--<el-form-item prop="username">-->
                <!--<el-input-->
                  <!--type="text"-->
                  <!--v-model="loginForm.username"-->
                  <!--autocomplete="off"-->
                  <!--placeholder="用户名"-->
                <!--&gt;</el-input>-->
              <!--</el-form-item>-->
              <!--<el-form-item prop="password">-->
                <!--<el-input-->
                  <!--type="password"-->
                  <!--v-model="loginForm.password"-->
                  <!--autocomplete="off"-->
                  <!--placeholder="密码"-->
                <!--&gt;</el-input>-->
              <!--</el-form-item>-->
              <!--<el-form-item>-->
                <!--<el-button type="primary" @click="submitForm('loginForm')" round-->
                  <!--&gt;注册</el-button-->
                <!--&gt;-->
              <!--</el-form-item>-->
            <!--</div>-->
          <!--</el-form>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="small-box" :class="{ active: isLogin }">-->
        <!--<div class="small-contain" v-if="isLogin">-->
          <!--<div class="stitle">你好，朋友!</div>-->
          <!--<p class="scontent">开始注册，和我们一起旅行</p>-->
          <!--<el-button type="plain" round @click="changeType">注册</el-button>-->
        <!--</div>-->
        <!--<div class="small-contain" v-else>-->
          <!--<div class="stitle">欢迎回来!</div>-->
          <!--<p class="scontent">与我们保持联系，请登录你的账户</p>-->
          <!--<el-button type="plain" round @click="changeType">登录</el-button>-->
        <!--</div>-->

    </div>

 <!--<div :class="{LoginForm:isLogin,RegisterForm:!isLogin}">-->
     <!--<div class="UserName"> <img src="../assets/username.png" class="Logo"><input type="text" class="Input" placeholder="用户名"/></div>-->
     <!--<div class="PassWord"><img src="../assets/password.png" class="Logo" ><input type="password" class="Input" placeholder="密码"/></div>-->
     <!--<div><button class="LoginBtn" @click="handleLogin('loginForm')"/><button class="RegistBtn"/></div>-->

 <!--</div>-->
<!--</div>-->
</template>

<script>
import { loginRules } from "../utils/validator";

export default {
  data() {
    return {
      // isLogin: true,
      loginForm: {
        username: "",
        password: "",
      },
      loginRules,
    };
  },
  methods: {
    // 登录事件
    handleLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("app/login", this.loginForm)
            .then(() => {
              this.$store.dispatch("app/setMenuList");
              this.$router.replace("/");
              // setTimeout(() => {
              //
              // }, 1200);
            })
            .catch(() => {
              this.$message.error(this.$t('login.error'));
            });
        } else {
          this.$notify.error({
            title: " 错误",
            message: this.$t('login.empty'),
          });

          return false;
        }
      });
    },
    // 切换到登录/注册界面
    changeType() {

      this.isLogin = !this.isLogin;
    },
  },
};
</script>
<style scoped>
  .LoginBackground{
    background: url("../assets/LoginBackground.jpg") no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    overflow: hidden;

  }
  .LoginForm{
    background: url("../assets/Login.png") no-repeat;
    background-size: 800px,599px;
    width: 1000px;
    height: 800px;
    margin-left: 555px;
    margin-top: 100px;
    overflow: hidden;
  }
  .UserName{
      overflow: hidden;
      border:2px solid #2abeb2;
      border-radius: 20px;
      margin-top: 270px;
      margin-left: -60px;
      height: 70px;
      width: 530px;
  }
  .PassWord{
      overflow: hidden;
      border:2px solid #2abeb2;
      border-radius: 20px;
      margin-top: 20px;
      margin-left: -60px;
      height: 70px;
      width: 530px;
  }
  .Input{
      overflow: hidden;
      margin-left: 20px;
      height: 80px;
      font-size: 35px;
      color: #2abeb2;


  }
  .Logo{
      overflow: hidden;
      margin-left: 15px;
      margin-bottom: 5px;
  }
  .LoginBtn{
      overflow: hidden;
      background: url("../assets/LoginButton.png");
      background-size: 100%;
      width: 220px;
      height: 65px;
      margin-left: 290px;
      margin-top: 10px;
  }
  .NameNotNull{
      margin-left: 200px;

  }
  .PasswordNotNull{
      margin-left: 200px;
  }
  input::-webkit-input-placeholder {
      color: #2abeb2;
  }
  input::-ms-input-placeholder {
      color: #2abeb2;
  }

</style>
