import { createStore } from "vuex";

import Login from "./modules/login";
import Server from "./modules/server";

export default new createStore({
  modules: {
    Login,
    Server
  }
});

