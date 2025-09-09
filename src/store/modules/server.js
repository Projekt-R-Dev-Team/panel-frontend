import { Server } from "../../models";
import { ModelManager } from "../manager";
import api from '../../services/api';

const manager = new ModelManager(Server);

const state = {
  manager,
  ...manager.state,
  adminServer : []
};

const getters = {
  ...manager.getters,
  admin: (state) => state.adminServer
};

const actions = {
  ...manager.actions,
  admin({ commit }) {
    return new Promise((resolve, reject) => {
      api
          .get("/server/admin/")
          .then((resp) => {
            commit("admin_server", resp.data.results)
          })
          .catch((err) => {
            reject(err);
          });
    });
  }
};

const mutations = {
  ...manager.mutations,
  admin_server(state, servers) {
    state.adminServer = servers;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
