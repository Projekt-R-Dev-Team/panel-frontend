import Vue from "vue";
import Vuex from "vuex";

import Login from "./modules/login";
import Server from "./modules/server";
import Sidebar from "./modules/sidebar";
import Alerts from "./modules/alerts";
import News from "./modules/news";
import ServerScripts from "./modules/server_script";
import Groups from "./modules/groups"
import User from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Login,
    Server,
    Sidebar,
    Alerts,
    News,
    ServerScripts,
    Groups,
    User
  }
});
