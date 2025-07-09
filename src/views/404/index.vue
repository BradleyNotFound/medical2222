<template>
  <div class="bg-container">
    <el-button @click="backHome" class="back-home">{{ $t('notFound.back') }}</el-button>
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
      this.$message.success(this.$t('notFound.success'));
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
