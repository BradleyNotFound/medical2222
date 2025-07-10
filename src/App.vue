<template>
  <div id="app">
    <ParticleBackground />
    <router-view></router-view>
    <!-- AI聊天助手 -->
    <ai-chat></ai-chat>
  </div>
</template>

<script>
    export default {
        name: "app",
        mounted() {
            //只要刷新页面，就会重新加载路由树，保证了路由不会丢失数据
            if (localStorage.getItem("userInfo")) {
                this.$store.dispatch("app/setMenuList");
            }
        },
    };
</script>
