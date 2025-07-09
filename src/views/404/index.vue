<template>
  <div class="bg-container">
    <el-button @click="backHome" class="back-home">离开这个是非之地</el-button>
  </div>
</template>

<script>
export default {
  name: "notFound",
  methods: {
    backHome() {
      setTimeout(() => {
        this.$router.replace("/");
      }, 200);
      this.$message.success("你回到了正确的道路上");
    },
  },
};
</script>

<style lang="css" scoped>
.bg-container {
  width: 100%;
  height: 100%;
  background-image: url("https://z3.ax1x.com/2021/09/03/hybVbQ.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.back-home {
  position: relative;
  top: 90%;
  left: 45%;
}
</style>
