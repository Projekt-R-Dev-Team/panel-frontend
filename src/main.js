import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VueRouter from 'vue-router'
import "./assets/css/theme.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(VueRouter)
Vue.use(Toast);

window.app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
