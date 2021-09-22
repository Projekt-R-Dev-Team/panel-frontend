import { createStore } from "vuex";

import Login from "./modules/login";
import Server from "./modules/server";
import Sidebar from "./modules/sidebar";
import Alerts from "./modules/alerts";

export default new createStore({
  modules: {
    Login,
    Server,
    Sidebar,
    Alerts
  }
});
