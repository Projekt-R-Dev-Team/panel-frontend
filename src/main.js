import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";

import "./assets/css/theme.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";

// Alerts
import moshaToast from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

createApp(App).use(store).use(router).use(moshaToast).mount("#app");
