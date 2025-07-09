<template>
  <div class="header-container">
    <div class="HomeLogo">

    </div>
    <div class="main-head">
      <div class="main-head-right">
        <span>{{ $t('header.welcome') }}<span id="username">{{ userName }}</span></span>
        <el-select
          v-model="lang"
          size="mini"
          @change="changeLang"
          class="lang-select"
        >
          <el-option label="中文" value="zh" />
          <el-option label="English" value="en" />
        </el-select>
        <div class="exit-area" @click="handleLogout">
          <p class="iconfont icon-tuichu"></p>
          <p class="logout">{{ $t('header.logout') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  data() {
    return {
      lang: localStorage.getItem('lang') || 'zh',
    };
  },
  methods: {

    handleLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      this.$message.warning(this.$t('header.loggedOut'));
      this.$router.replace("/user/login");
      this.$router.go(0);
    },
    changeLang(val) {
      this.$i18n.locale = val;
      localStorage.setItem('lang', val);
    },
  },
  computed: {

    userName() {
      return JSON.parse(localStorage.getItem("userInfo")).realname;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/icon/icon.css";
.header-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.system-name {
  width: 200px;
  height: 100%;
  background-color: #f3f3f4;
  color: #82879b;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.HomeLogo{
  background: url("../../../assets/HomeLogo.png") no-repeat;
  background-size: 100%;
  height: 100px;
  width: 400px;
}
.main-head {
  height: 60px;
  color: #82879b;
  padding: 0 20px;
  .main-head-right {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .exit-area {
      position: relative;
      left: 78px;
      display: flex;
      // justify-content: center;
      align-items: center;
    }
    .icon-tuichu {
      margin-left: 4px;
      font-size: 20px;
    }
    .logout {
      font-weight: 700;
      font-size: 18px;
      color: #949697;
      cursor: pointer;
    }
    span {
      font-size: 18px;
    }
    #username {
      font-size: 20px;
      font-style: italic;
      font-weight: bold;
    }
    .lang-select {
      margin-left: 10px;
      .el-input__inner {
        border-radius: 12px;
        background-color: #f7f7f7;
        border-color: #dcdfe6;
      }
    }
  }
}
</style>
