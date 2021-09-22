import Cookies from "js-cookie";
import api from "../../services/api";

export const COOKIE_NAME = "server_panel";

const state = {
  token: Cookies.get(COOKIE_NAME) || ""
};

const getters = {
  isLoggedIn: (state) => !!state.token,
  token: (state) => state.token,
  data: (state) =>
    state.token ? JSON.parse(atob(state.token.split(".")[1])) : {}
};

const actions = {
  login({ commit }, loginData) {
    return new Promise((resolve, reject) => {
      api
        .post("user/login/", loginData)
        .then((resp) => {
          if (resp.data.token) {
            const token = `Bearer ${resp.data.token}`;
            commit("auth_success", token);
            resolve(resp);
          }
        })
        .catch((err) => {
          commit("logout");
          reject(err);
        });
    });
  },
  logout({ commit }) {
    return new Promise((resolve) => {
      commit("logout");
      resolve();
    });
  }
};

const mutations = {
  auth_success(state, token) {
    console.log("HIER!");
    state.token = token;
    Cookies.set(COOKIE_NAME, token);
  },
  logout(state) {
    state.token = "";
    Cookies.remove(COOKIE_NAME);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
