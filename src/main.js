import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import _ from 'lodash'
import "./style/reset.css";
import "./plugins/element.js";
import i18n from "./i18n";
import Fragment from "vue-fragment";
import "animate.css";

Vue.config.productionTip = false;
Vue.use(Fragment.Plugin); //解决导航栏折叠时文字不折叠的问题
Vue.prototype._ = _;
Vue.mixin({
    computed: {
        // 进行按钮权限控制
        hasRole() {
            if(localStorage.getItem('userInfo')) {
                if(JSON.parse(localStorage.getItem('userInfo')).utype == 1) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        }
    }
});

new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App),
}).$mount("#app");
