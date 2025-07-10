<template>
  <div id="app">
    <ParticleBackground />
    <router-view></router-view>
  </div>
</template>

<script>
import ParticleBackground from "./components/ParticleBackground.vue";

export default {
  name: "app",
  components: { ParticleBackground },
  mounted() {
    //只要刷新页面，就会重新加载路由树，保证了路由不会丢失数据
    if (localStorage.getItem("userInfo")) {
      this.$store.dispatch("app/setMenuList");
    }
  },
};
</script>
